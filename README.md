
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
