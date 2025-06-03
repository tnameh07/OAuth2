import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const app = express();
const PORT = 8080;

// EJS setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Render the login page
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/auth/google', (_req, res) => {
	const redirectUri = `http://localhost:${PORT}/auth/google/callback`;
	const clientId = process.env.GOOGLE_CLIENT_ID;
console.log("clientId :",clientId)
	const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email profile&access_type=offline&prompt=consent`;
	res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
	const code = req.query.code;
	const redirectUri = `http://localhost:${PORT}/auth/google/callback`;
    console.log("code :",code)
	try {
		const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
			client_id: process.env.GOOGLE_CLIENT_ID,
			client_secret: process.env.GOOGLE_CLIENT_SECRET,
			code,
			redirect_uri: redirectUri,
			grant_type: 'authorization_code',
		});
console.log("tokenRes :" ,tokenRes.data)
		const accessToken = tokenRes.data.access_token;

		const profileRes = await axios.get(
			'https://www.googleapis.com/oauth2/v2/userinfo',
			{
				headers: { Authorization: `Bearer ${accessToken}` },
			}
		);
console.log("profileRes :" ,profileRes.data)
		const userData = {
			name: profileRes.data.name,
			email: profileRes.data.email
		};

		res.render('success', { userData });
	} catch (err) {
		console.error('Google OAuth Error:', err);
		res.send('Google login failed');
	}
});

app.listen(PORT, () => {
	console.log(`🚀 Backend running at http://localhost:${PORT}`);
});