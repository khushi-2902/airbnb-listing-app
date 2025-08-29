
# 🏡 Airbnb Clone – Full-Stack Web Application

A full-stack web application inspired by **Airbnb**, where users can **create, manage, and explore property listings**. The platform supports **secure authentication, image uploads, and reviews**, making it a real-world project that demonstrates full-stack development skills.

---

## 🚀 Features

- 👤 **User Authentication** – Sign up, log in, and log out securely (Passport.js).
- 🏡 **Listings Management** – Create, edit, and delete property listings.
- 🖼️ **Image Uploads** – Integrated with Cloudinary for image hosting.
- ✍️ **Reviews System** – Add, view, and delete reviews for listings.
- 🔐 **Authorization** – Only owners can edit or delete their listings/reviews.
- 📱 **Responsive UI** – Clean and user-friendly interface with Bootstrap/EJS.

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB, Mongoose  
- **Frontend**: EJS, Bootstrap  
- **Authentication**: Passport.js  
- **Image Hosting**: Cloudinary  

---

## 📂 Installation Guide

Follow these steps to run the project locally:

```bash
# Clone the repository
git clone https://github.com/khushi-2902/airbnb-clone.git

# Navigate into the project folder
cd airbnb-clone

# Install dependencies
npm install

# Add your environment variables in .env file
# Example:
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_SECRET=your_secret
# MONGO_URI=your_mongodb_uri
# SESSION_SECRET=your_session_secret

# Run the server
npm start
