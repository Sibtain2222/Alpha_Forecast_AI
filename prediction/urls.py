from django.urls import path
from acounts import views as UserView
from .views import StockPredictionAPIView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns =[
    path('register/' , UserView.RegisterView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected-view/', UserView.ProtectedView.as_view()),
    ## Predicted api
    path('predict/', StockPredictionAPIView.as_view() , name='stock_prediction')
]

