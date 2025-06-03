import express from 'express'
import authRoute from './routes/authRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';

dotenv.config();
const app = express();

// EJS setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/auth',authRoute);

// Render the login page
app.get('/', (req, res) => {
    res.render('index');
});

app.get("/google/callback", async (req, res) => {
    res.send("Google OAuth Callback Url!");
});

const PORT = 8080
app.listen(PORT, ()=>console.log(`http://localhost:${PORT}`))