import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

// Load your Google credentials from environment variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:8080/auth/google/callback';

const GOOGLE_OAUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';
const GOOGLE_OAUTH_SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
];

// Check required env vars before starting OAuth flow
function checkGoogleEnvVars(res) {
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
        res.status(500).send('Missing Google OAuth ENV variables. Please set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_CALLBACK_URL in your .env file.');
        return false;
    }
    return true;
}

// Step 1: Redirect to Google Consent Screen
export const googleOAuthRedirect = (req, res) => {
    if (!checkGoogleEnvVars(res)) return;
    const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: GOOGLE_CALLBACK_URL,
        response_type: 'code',
        scope: GOOGLE_OAUTH_SCOPES.join(' '),
        access_type: 'offline',
        prompt: 'consent',
    });
    res.redirect(`${GOOGLE_OAUTH_URL}?${params.toString()}`);
};

// Step 2: Handle Google callback, exchange code for tokens, get user info
export const googleOAuthCallback = async (req, res) => {
    if (!checkGoogleEnvVars(res)) return;
    const code = req.query.code;
    if (!code) return res.status(400).send('No code provided');
    try {
        // Exchange code for tokens
        const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: GOOGLE_CALLBACK_URL,
                grant_type: 'authorization_code',
            }),
        });
        const tokenData = await tokenRes.json();
        if (!tokenData.access_token) throw new Error('No access token');
        // Fetch user info
        const userRes = await fetch(GOOGLE_USERINFO_URL, {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });
        const userInfo = await userRes.json();
        // Show user info as JSON (or render a page)
        res.json({ user: userInfo });
    } catch (err) {
        res.status(500).send('OAuth Error: ' + err.message);
    }
};
