# MERN Stack E-Commerce Platform  

## Overview  
 This Site is a **MERN stack-based e-commerce platform** built with **ReactJS, NodeJS, Express, and MongoDB** to provide a smooth and user-friendly shopping experience. It includes **secure authentication, product browsing, cart management, and checkout**. The platform also uses the **Pearson Correlation Coefficient** algorithm to provide **personalized product recommendations**.  

## Features  
- 🛍️ **User Authentication** – Secure login & registration  
- 🔍 **Product Browsing & Search** – Fast and efficient filtering  
- 🛒 **Shopping Cart & Checkout** – Smooth cart management  
- 🎯 **Personalized Recommendations** – AI-driven product suggestions  
- 🚀 **Scalable & Fast** – Optimized for performance  

## Tech Stack  
- **Frontend**: ReactJS, React-Bootstrap
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT  
- **Recommendations**: Pearson Correlation Coefficient  

## Project Structure  
/ml-learning-journey
│── /server (Backend Code)
│── /cms (Admin Dashboard)
│── /frontend (User-Facing UI)
│── .env (Backend Environment Variables)
│── README.md


## Environment Variables  

### Backend `.env`  
API_PORT=3000
API_HOST='localhost'
MONGO_URL='mongodb://localhost:27017/jhola-db'

DEBUG=true
JWT_SECRET='your_jwt_secret_key'

### CMS `.env` (Admin Dashboard)  
VITE_API_URL="http://localhost:3000"

### Frontend `.env` (User-Facing UI)  
VITE_API_URL="http://localhost:5000"



## Installation & Setup  

### 1. Clone the Repository  
```bash
git clone https://github.com/Rawal77/ml-learning-journey.git  
cd ml-learning-journey
```

### 2. Setup Backend 
```bash
cd server  
npm install  
npm start
```

### 3. Setup CMS and Frontend (Admin Dashboard & User interface)
```bash
cd frontend  
npm install
```
npm run dev 
