import express from "express";
import { login, profile, register, remove } from "../controller/user-controller.js";
export const router = express.Router();



    router.post('/',login)
    router.post('/register',register)
    router.post('/profile',profile)
    router.post('/remove',remove)
    
