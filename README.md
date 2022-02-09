# Neurosity OAuth Example

## Required Environment Variables

Create `.env` file at the root of the project and add.

```
NEUROSITY_OAUTH_CLIENT_ID=ACME_NEURO_CLIENT_ID
NEUROSITY_OAUTH_CLIENT_SECRET=ACME_NEURO_CLIENT_SECRET
NEUROSITY_OAUTH_CLIENT_REDIRECT_URI=http://localhost:3000
NEUROSITY_ENABLE_SDK_EMULATOR=true
```

## Run locally

```
npm start
npm run functions
```

> This project is setup to work on port `3000` for the UI, and por `9999` for the functions server.
