import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express(); // ✅ Must be before any app.use()

// CORS setup
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Body parsers
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

// Cookie parser
app.use(cookieParser())

// User routes

import userRoutes from './routes/user.routes.js';
app.use("/api/v1/users", userRoutes); 
// => handles: POST http://localhost:8000/api/v1/users/register

export { app }
