This is Alaa's notes:

## Done:
1- Mongoose:

- establishing the Server and connecting to database
- creating error handler and connect to the server
- user schema, created: hashing and activation link are done!
- user schema: user experience added and will be used in review schema later to be displayed side by side with their comment
- staff schema, created: 
- room schema, created: an empty array for the booking dates, and for pictures were added
- booking schema, created
- payment schema, created: timestamp was added, a field call voucher was added to check for possible discounts
- review schema, created
- 

2- Routers:
- nothing
- yet


3- Middlewares:
- nothing
- yet



## DOTENV
List of variables that need to be consider while deploying this project:

- port: now we are on PORT ***8000***  from dotenv or ***5000*** static
- the url for our database:=> **DB_URI**
- secret key for JWT:=>   **PW_JWT**
- 