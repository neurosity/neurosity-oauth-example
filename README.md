# Neurosity OAuth Example: ACME Neuro

![App Screenshot](public/app.png)

Read documentation at [https://docs.neurosity.co/api/oauth](https://docs.neurosity.co/api/oauth)

## Development

### Add Required Environment Variables

Create `.env` file at the root of the project and add the following:

```
NEUROSITY_OAUTH_CLIENT_ID=ACME_NEURO_CLIENT_ID
NEUROSITY_OAUTH_CLIENT_SECRET=ACME_NEURO_CLIENT_SECRET
NEUROSITY_OAUTH_CLIENT_REDIRECT_URI=http://localhost:3000
```

Optional:

```
NEUROSITY_ENABLE_SDK_EMULATOR=true
```

## Run locally

```
npm start
npm run functions
```

> This project is setup to work on port `3000` for the UI, and port `9999` for the functions server.

## Deployment

This project was designed to work out of the box when deployed to [Netlify](https://netlify.com).
