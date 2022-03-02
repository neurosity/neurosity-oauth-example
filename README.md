# Neurosity OAuth Example: ACME Neuro

![App Screenshot](public/app.png)

Read documentation at [https://docs.neurosity.co/api/oauth](https://docs.neurosity.co/api/oauth)

## Development

### Add Required Environment Variables

Create `.env` file at the root of the project and add the following:

```
NEUROSITY_OAUTH_CLIENT_ID=<your client id here>
NEUROSITY_OAUTH_CLIENT_SECRET=<your client secret here>
NEUROSITY_OAUTH_CLIENT_REDIRECT_URI=http://localhost:3000
```

## Run locally

```
npm start
npm run functions
```

> This project is setup to work on port `3000` for the UI, and port `9999` for the functions server.

## Deployment

This project was designed to work out of the box when deployed to [Netlify](https://netlify.com).
