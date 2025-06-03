
IMplimentaion of OAuth 2.0

# ragistraion process
client 
POST/ragister
body:{
    client_name: "client name",
    redirect_uri: "http://localhost:8080
}

response :{
    'client_name' :"my app name",
    "client_id" : " sadfsgdfh",
    client_secret: "secret"
}

# 2 Fetch Authorization CODE
   Request :
   GET/authorize?
     response_type=code
     &client_id={id which client get during ragistration}
     &redirect_uri=yourcallback_uri
     &scope=scope1,scope2
     &state={some random value} it help us protecting csrf attacks // prevent CSRF attacks

response or redirect api 
http://localhost:8080/home?{Authorization_code}&state=dfdggff




GitHub :

OAuth Authorization URL
Constructed manually for user redirection:
https://github.com/login/oauth/authorize?client_id=<CLIENT_ID>&redirect_uri=<CALLBACK_URL>&scope=<SCOPE>&state=<STATE>

Access Token Exchange Endpoint

Your backend will use this to exchange the code:
POST https://github.com/login/oauth/access_token
Required body fields:
{
  "client_id": "your-client-id",
  "client_secret": "your-client-secret",
  "code": "code-from-github",
  "redirect_uri": "your-callback-url"
}
Set headers:
Accept: application/json
Generate a Private Key (🔐)
Found under: “Generate a private key” section.

Use in: If you plan to access GitHub as the app itself (e.g., app installations), not just user-auth.

Needed for JWT creation to get installation tokens, which are independent of user OAuth tokens.

Not needed if you're doing only user OAuth.

| Key                      | Use                                     |
| ------------------------ | --------------------------------------- |
| `Client ID`              | Build auth URL and token exchange       |
| `Client Secret`          | Secure backend to get token             |
| `Callback URL`           | Redirection after user authorizes       |
| `Private Key` (optional) | For app-based installation access       |
| `App ID` (optional)      | Used for JWT if going app-install route |



