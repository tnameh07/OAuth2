import { Router } from "express";
import { redirectTOGoogle, googleTOServer,redirectTOGitHub, gitHubTOServer } from "../controller/authController.js";
const route = Router();

// google
route.get('/google',redirectTOGoogle)
route.get('/google/callback',googleTOServer)

// GitHub
route.get('/github',redirectTOGitHub)
route.get('/github/callback',gitHubTOServer)

export default route;