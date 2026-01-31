# Alpha Forecast AI

Alpha Forecast AI is a full-stack web application that predicts future stock and cryptocurrency prices using machine learning models. Users can input a ticker symbol (e.g., BTC, GOOG, TSLA) and get predictions visualized with interactive charts. The app combines **Django backend**, **React frontend**, and **pre-trained machine learning models**.

---

## Features

- **Stock/Crypto Price Prediction**
  - Users enter a ticker symbol (e.g., BTC, TSLA)
  - Machine learning models predict future prices
  - Predictions visualized using **Matplotlib charts**
  
- **Two Prediction Models**
  1. **Tested Model**
     - Trained on 70% historical data
     - Validated on remaining 30%
     - Performance comparison visualized with graphs
  2. **Future Prediction Model**
     - Trained on 100% historical data (2016–2026)
     - Predicts future 12 months data

- **User Authentication**
  - Login, Register, Logout
  - JWT-based authentication
  - Axios instance for API requests

- **Frontend & Backend**
  - **Backend:** Django + Django REST Framework
  - **Frontend:** React.js
  - **Interactive charts** for predictions

---

## Tech Stack

- **Backend:** Django, Django REST Framework, JWT Authentication
- **Frontend:** React.js, Axios
- **Machine Learning:** Python, Pandas, NumPy, Scikit-learn, Matplotlib
- **Environment Management:** Conda, Virtualenv
- **Database:** SQLite (development)
- **Version Control:** Git + GitHub

---
# PROJECT DEMO VIDEO :
https://github.com/user-attachments/assets/c2bb2068-1897-4e06-b85a-df3ba539ef47

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- Conda (optional, for managing ML environment)
- Git

### Setup Instructions

1. **Clone the repository**       
```bash
git clone https://github.com/Sibtain2222/Alpha_Forecast_AI.git
cd Alpha_Forecast_AI


Create a virtual environment

python -m venv env
source env/bin/activate   # Linux / Mac
env\Scripts\activate      # Windows


Install backend requirements

pip install -r requirements.txt


Setup Django backend

python manage.py migrate
python manage.py createsuperuser  # optional
python manage.py runserver


Install frontend dependencies

cd Frontend-React-Web
npm install
npm start

### Author:
 #### Sibtain
