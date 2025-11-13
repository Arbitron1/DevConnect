DevConnect – MERN Social Media Platform

DevConnect is a full-stack social networking platform where users can create accounts, share posts, follow other developers, and build their professional network.
Built with MongoDB, Express, React, Node.js, and TypeScript, DevConnect focuses on scalable architecture and a clean developer experience.

🚀 Tech Stack
Frontend

React + TypeScript

Redux Toolkit

TailwindCSS

Axios

React Router

Backend

Node.js

Express

TypeScript

MongoDB + Mongoose

JWT Authentication

Bcrypt

Cloudinary (optional: for image uploads)

✨ Features
🔐 Authentication

User registration & login

JWT-based auth

Secure password hashing

👤 User Profiles

View profile

Edit bio, avatar, location

View user-specific posts

📝 Posts System

Create posts

Like / Unlike

Comment (if implemented)

Explore global feed

🤝 Social Features (Planned)

Follow / Unfollow

Suggested users

Messaging (Socket.io)

Notifications

📁 Project Structure
Backend
server/
│── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   ├── index.ts
│── package.json

Frontend
client/
│── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── utils/
│── package.json

🛠️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/Arbitron1/DevConnect.git
cd DevConnect

🔧 Backend Setup
cd server
npm install
npm run dev

Create a .env file:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

🎨 Frontend Setup
cd client
npm install
npm run dev

Client .env
VITE_API_URL=http://localhost:5000/api

🧭 API Overview
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/users/:id	Get user profile
POST	/api/posts/	Create post
GET	/api/posts/	Get all posts
🧩 Roadmap

Follow/Unfollow system

Image uploads

Comments & Replies

Real-time chat (Socket.io)

Notifications

Deployment (Render + Vercel)

🤝 Contributing

Pull requests are welcome!
For major changes, open an issue first to discuss what you'd like to change.

📄 License

MIT License © 2025 DevConnect