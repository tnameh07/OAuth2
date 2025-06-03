import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import path from 'path';
import authRoute from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT =   process.env.PORT|| 8080;

// EJS setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Render the login page
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/auth',authRoute);


app.listen(PORT, () => {
	console.log(`Backend running at http://localhost:${PORT}`);
});