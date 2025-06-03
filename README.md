
// Google's OAuth 2.0 endpoint for requesting an access token
var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

Sample OAuth 2.0 server response
https://accounts.google.com/o/oauth2/v2/auth?
 scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly%20https%3A//www.googleapis.com/auth/calendar.readonly&
 include_granted_scopes=true&
 response_type=token&
 state=state_parameter_passthrough_value&
 redirect_uri=https%3A//oauth2.example.com/code&
 client_id=client_id
 

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


Obtaining OAuth 2.0 access tokens
The list below quickly summarizes these steps:

Your application identifies the permissions it needs.
Your application redirects the user to Google along with the list of requested permissions.
The user decides whether to grant the permissions to your application.
Your application finds out what the user decided.
If the user granted the requested permissions, your application retrieves tokens needed to make API requests on the user's behalf.


Step 1: Set authorization parameters
https://developers.google.com/identity/protocols/oauth2/web-server#node.js
| **Parameter**             | **Required**   | **Description**                                                        |
| ------------------------- | -------------- | ---------------------------------------------------------------------- |
| `client_id`               | ✅              | App's client ID from Cloud Console.                                    |
| `redirect_uri`            | ✅              | Must match an authorized URI in Cloud Console exactly.                 |
| `response_type`           | ✅              | Use `code` to get an authorization code.                               |
| `scope`                   | ✅              | Space-separated list of requested permissions (e.g., `email profile`). |
| `access_type`             | 🔁 Recommended | Set to `offline` to receive a refresh token.                           |
| `state`                   | 🔐 Recommended | Custom string to prevent CSRF; helps validate request/response.        |
| `include_granted_scopes`  | Optional       | Set to `true` for incremental scope requests.                          |
| `enable_granular_consent` | Optional       | Enables detailed permission prompts (default `true`).                  |
| `login_hint`              | Optional       | Prefills user email or ID to simplify login.                           |
| `prompt`                  | Optional       | Force specific user prompts like `consent`, `select_account`, etc.     |


Step 2: Redirect to Google's OAuth 2.0 server

Step 3: Google prompts user for consent
Step 4: Handle the OAuth 2.0 server response

Sample OAuth 2.0 server response
https://accounts.google.com/o/oauth2/v2/auth?
 scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly%20https%3A//www.googleapis.com/auth/calendar.readonly&
 access_type=offline&
 include_granted_scopes=true&
 response_type=code&
 state=state_parameter_passthrough_value&
 redirect_uri=https%3A//oauth2.example.com/code&
 client_id=client_id