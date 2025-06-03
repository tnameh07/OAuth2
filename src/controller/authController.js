import axios from "axios";
export async function redirectTOGoogle(req, res) {
    const redirectUri = `http://localhost:${process.env.PORT}/auth/google/callback`;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    console.log("clientId :", clientId)
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email profile&access_type=offline&prompt=consent`;
    res.redirect(url);
}

export async function googleTOServer(req, res) {
    const code = req.query.code;
    const redirectUri = `http://localhost:${process.env.PORT}/auth/google/callback`;
    console.log("code :", code)
    try {
        const tokenRes = await googleAuthorizationServer(code, redirectUri);
        const accessToken = tokenRes?.data?.access_token;
        const profileRes = await googleResourseServer(accessToken)
        console.log("profileRes :", profileRes.data)
        const userData = {
            name: profileRes?.data?.name,
            email: profileRes?.data?.email
        };

        res.render('success', { userData });
    } catch (err) {
        console.error('Google OAuth Error:', err);
        res.send('Google login failed');
    }
}

async function googleAuthorizationServer(authorization_code ,redirectUri) {
   try{
    const AuthTokens = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code:authorization_code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
    })
 return AuthTokens;
   }catch(err){
    throw new Error(err)
   }
}

async function googleResourseServer(accessToken) {
    
    const userResource = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );

    return userResource;
}


export async function redirectTOGitHub(req, res) {
    const redirectUri = `http://localhost:${process.env.PORT}/auth/github/callback`;
    const clientId = process.env.GITHUB_CLIENT_ID;

    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email`;

    res.redirect(url);
}


export async function gitHubTOServer(req, res) {
    const code = req.query.code;

    const tokenRes = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        },
        {
            headers: {
                Accept: 'application/json',
            },
        }
    );

    const accessToken = tokenRes.data.access_token;

    const userRes = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    const emailRes = await axios.get('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    const email = emailRes.data.find((e) => e.primary && e.verified)?.email;
    // console.log(userRes?.data?.name ,"emailRes :",emailRes.data)
    const userData = {
        name: emailRes?.data?.name || 'unknown',
        email
    }
    res.render('success', { userData });
}