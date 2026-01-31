import React from 'react'
import Button from './Button'
import Footer from './Footer'
import Header from './Logout'

const Main = () => {
  return (
    <> 
    <div className='container '>
      <div className='p-5 text-center bg-light-dark rounded'>
        <h1 className='text-light'>AI-Powered Stock Market Prediction Platform </h1>
        <p className='text-light lead'>This project allows users to enter a stock ticker such as GOOG, TSLA, or any publicly listed company to analyze potential future price movement.
By leveraging historical market data, technical indicators, and machine-learning models, the system predicts whether a stock may trend upward or downward over time.
The platform is designed to help users explore market behavior, understand trends, and gain data-driven insights for educational and research purposes only.</p>
        <Button url='/dashboard' text='Explore Now' class="btn-outline-info"/>
      </div>
    </div>
    </>
  )
}

export default Main