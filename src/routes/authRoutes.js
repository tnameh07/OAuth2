import { Router } from "express";
import { googleOAuthRedirect, googleOAuthCallback } from '../controller/authController.js';

const route = Router();

// Minimal Google OAuth2.0 endpoints
route.get('/google', googleOAuthRedirect);
route.get('/google/callback', googleOAuthCallback);

export default route;