Prerequisites: 
npm 

Disclaimer: 
The db credentials as well as the file upload credentials are hard coded into the backend code. 
The database is hosted on a free mongodb atlas instance, the file upload in an aws s3 bucket

When booking the session, use 4242 4242 4242 4242 (Visa) as card number detail, any 3 digit number as cvc and a future date as expiration date. 


An admin user (with pre-booked session and pre offered sessions) is available with following credentials: email: admin@test.com password:password

To run the web app: 
1. Execute backend (npm install,  npm run app)
2. Run Frontend (npm install, npm run start) 
3. Navigate to /home or to / to have an overview over available routes 

The frontend is hosted on port 3000, the backend on port 8082
