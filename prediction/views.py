from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework import status
import yfinance as yf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime
import os 
from django.conf import settings
from .utile import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error ,r2_score


class StockPredictionAPIView(APIView):
     def post(self, request):
        serializer=StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker=serializer.validated_data['ticker']
            # fetch the data from yfinance
            now=datetime.now()
            start= datetime( now.year -10 , now.month , now.day)
            end=now
            tricker=ticker
            df=yf.download(tricker,start,end)
            if df.empty:
                return Response({'error':'No data found for the given tricker' , 'status':status.HTTP_404_NOT_FOUND})
            df=df.reset_index()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,6))
            plt.plot(df.Close ,label={tricker})
            plt.title(f'closing price of {tricker}')
            plt.xlabel('Days')
            plt.ylabel('close Price')
            plt.legend()
            # save the plot to the file 
            plot_img_path=f'{tricker}_plot.png'
            plot_img=save_plot(plot_img_path)

            # Spliting data into traning and testing dataset 
            traning_data= pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            testing_data=pd.DataFrame(df.Close[int(len(df)*0.7): int(len(df))])

            # Scalling down data between 0 and 1 
            scaler = MinMaxScaler(feature_range=(0,1))

            #load Ml Model
            model=load_model('Stock_Prediction_Model.keras')

            # Preparing Test Data
            past_100_data=traning_data.tail(100)
            final_drf= pd.concat([past_100_data , testing_data] , ignore_index=True)
            input_data=scaler.fit_transform(final_drf)

            x_test=[]
            y_test=[]
            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100:i])
                y_test.append(input_data[i, 0])
            x_test , y_test =np.array(x_test), np.array(y_test)
            
            # Making Prediction
            y_predicted=model.predict(x_test)
            
            # Revert the scaler price into orignal price 
            y_predicted=scaler.inverse_transform(y_predicted.reshape(-1,1)).flatten()
            y_test=scaler.inverse_transform(y_test.reshape(-1,1)).flatten()

            # PLot the final Prediction

            plt.switch_backend('AGG')
            plt.figure(figsize=(12,6))
            plt.plot(y_test , 'b',label='Orignal Price')
            plt.plot(y_predicted, 'r', label='Final Predicted Price')
            plt.title(f'Final Predicted Price {tricker}')
            plt.xlabel('Days')
            plt.ylabel('close Price')
            plt.legend()
            plot_img_path=f'{tricker}_Final_Prediction.png'
            plot_Prediction=save_plot(plot_img_path)
             
            # ////////////////furture prediction////////////// 
            # df= df[['Close']].copy() 
            df = df[['Date', 'Close']].copy()
            df['Date'] = pd.to_datetime(df['Date'])
            df.dropna(inplace=True)
            df.set_index('Date', inplace=True)
            # df.dropna(inplace=True)
            scaler = MinMaxScaler(feature_range=(0,1))
            scaled_data = scaler.fit_transform(df.values)
            model_future=load_model('stock_lstm_model_.keras')
            last_100_days = scaled_data[-100:]
            current_input = last_100_days.reshape(1, 100, 1)

            last_date = df.index[-1]
            future_end = pd.Timestamp("2027-02-01")
            future_days = (future_end - last_date).days



            future_predictions = []
            future_dates = []

            current_date = last_date

            for i in range(future_days):

                # predict next day
                next_price = model_future.predict(current_input, verbose=0)[0][0]

                # save
                future_predictions.append(next_price)

                # next date
                current_date += pd.Timedelta(days=1)
                future_dates.append(current_date)

                # slide window
                current_input = np.append(
                    current_input[0, 1:, 0],
                    next_price
                ).reshape(1, 100, 1)

            future_predictions = np.array(future_predictions)

            future_df = pd.DataFrame({
                "Date": future_dates,
                "Predicted_Close": future_predictions.flatten()
            })

            future_df.set_index("Date", inplace=True)

            
            plt.switch_backend('AGG')
            plt.figure(figsize=(12, 6))

            plt.plot(
                future_df.index,
                future_df["Predicted_Close"],
                label="Predicted future Price",
                color="green"
            )
            plt.grid(True)

            plt.title(f"{tricker} Predicted Stock Price (Future)")
            plt.xlabel("Date")
            plt.ylabel("Price")
            plt.legend()
            Future_img_path=f'{tricker}_Future_Prediction.png'
            Future_Prediction=save_plot(Future_img_path)


            # Modlel Evalution

            # Means Squared Error MSE
            mse= mean_squared_error(y_test,y_predicted)

            #Root mean square error (RMSE) it asked that how many differnt bt price
            rmse= np.sqrt(mse)

            # R-Square   it answer in 0 and 1 
            r = r2_score(y_test,y_predicted)
            print(r)


            return Response({ 'status': 'success' ,'plot_img':plot_img ,   'plot_Prediction' : plot_Prediction, 'Future_Prediction': Future_Prediction,'mse':mse,'rmse':rmse, 'r':r })