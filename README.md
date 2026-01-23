# LMS - MERN Stack Learning Platform

A comprehensive Learning Management System (LMS) built with the MERN stack, designed to provide an intuitive and powerful platform for online education and course management.

## 🎓 About

CourseConvo is a modern learning platform that enables educators to create and manage courses while providing students with an engaging learning experience. Built with scalability and user experience in mind, it integrates industry-standard tools for media management and secure payment processing.

**Live Demo:** [https://courseconvo.onrender.com](https://courseconvo.onrender.com)

## 📸 Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/4ccfabca-aa6e-4f13-b934-58c17e130362" alt="Dashboard" width="49%" style="border: 2px solid #000;" />
  <img src="https://github.com/user-attachments/assets/bf6325b5-c590-48b7-9d16-bc80082ceecb" alt="Course Catalog" width="49%" style="border: 2px solid #000;" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/9ab7f683-e2cc-46d3-ba3c-679b0d7c1164" alt="Course Details" width="49%" style="border: 2px solid #000;" />
  <img src="https://github.com/user-attachments/assets/75a46567-452d-45e7-8759-01faf864ae2d" alt="Progress Tracking" width="49%" style="border: 2px solid #000;" />
</p>

## 🏗️ System Architecture

  <img src="https://github.com/user-attachments/assets/c00c621a-4d9b-48aa-b543-bc446cd97c10" alt="System Architecture - Frontend" width="49%" style="border: 2px solid #000;" />
  <img src="https://github.com/user-attachments/assets/ce31101d-5e29-4108-a2ae-7ff1b3f63f95" alt="System Architecture - Backend" width="49%" style="border: 2px solid #000;" />


The platform follows a modern MERN stack architecture with clear separation between frontend and backend services, integrated with third-party services for media management (Cloudinary) and payment processing (PayPal).


## ✨ Features

- **User-Friendly Interface**: Intuitive and clean design for seamless navigation
- **Course Management**: Complete CRUD operations for courses, lessons, and content
- **Real-Time Progress Tracking**: Monitor student progress and completion status in real-time
- **Media Management**: Integrated with Cloudinary for efficient video and image handling
- **Secure Payments**: PayPal SDK integration for safe and reliable course purchases
- **Responsive Design**: Fully responsive across all devices
- **User Authentication**: Secure login and registration system
- **Student Dashboard**: Personalized dashboard for enrolled courses and progress
- **Instructor Tools**: Comprehensive tools for course creation and student management

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Redux (State Management)
- React Router
- CSS3/Styled Components

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Integrations:**
- Cloudinary (Media Storage & CDN)
- PayPal SDK (Payment Processing)

**Deployment:**
- Render

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary Account
- PayPal Developer Account
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/lms-platform.git
cd lms-platform
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd frontend
npm install
```

4. Set up environment variables

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=your_backend_api_url
REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
```

5. Run the application

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

## 📱 Usage

### For Students:
1. **Browse Courses**: Explore available courses in the catalog
2. **Purchase**: Securely purchase courses using PayPal
3. **Learn**: Access course content and video lessons
4. **Track Progress**: Monitor your learning progress in real-time
5. **Certificates**: Earn certificates upon course completion

### For Instructors:
1. **Create Courses**: Build comprehensive courses with multiple lessons
2. **Upload Content**: Add videos, documents, and resources via Cloudinary
3. **Manage Students**: View enrolled students and their progress
4. **Update Content**: Edit and improve courses based on feedback
5. **Analytics**: Track course performance and student engagement

## 🎯 Key Features Explained

### Real-Time Progress Tracking
- Automatic progress calculation based on completed lessons
- Visual progress bars and completion percentages
- Course completion certificates

### Course Management
- Rich text editor for course descriptions
- Video upload and streaming via Cloudinary
- Organize content into sections and lessons
- Quiz and assessment integration

### Payment Integration
- Secure checkout with PayPal
- Transaction history and receipts
- Automatic course enrollment after payment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👤 Author

Your Name - [@prakhar2005](https://x.com/prakharshri2005)

## 💬 Feedback

I'd love to hear your thoughts! Please feel free to:
- Open an issue for bugs or feature requests
- Submit a pull request
