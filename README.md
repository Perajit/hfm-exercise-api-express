# Getting started
## Install dependencies
```bash
npm install
```
## Start server
```
npm run build && npm start
```
The server will run at http://localhost:3000.

# Scope & Assumptions

### POST /user/register
- Verify request payload schema:
  - **firstName**: required, no special character
  - **lastName**: required, no special character
  - **countryCode**: required, one of [`CYP`, `DEU`, `THA`, `GBR`, `USA`]
  - **phoneNumber**: required, numeric
  - **email**: required, email format
  - **experience**: required, one of [`EXP_01`, `EXP_02`, `EXP_03`, `EXP_04`, `EXP_05`]
- Verify if exail is already registered
  - No database connection, use hard coded existing emails for simplicity
- Logic for registration process is NOT included
- Return response with status 200 if success
- Return response with status 400 for valid payload schema.
- Return response with status 409 if email is already registered.

### POST /auth/login
- Verify if credentials is valid
  - No database connection, use hard coded credentials list for simplicity
- Password hashing is NOT included
- Return response with status 200, auth cookies, and account info in body if success
- Return response with status 401 if credentials is invalid

### POST /auth/logout
- Return response without auth cookies
