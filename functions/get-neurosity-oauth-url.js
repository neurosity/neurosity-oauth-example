const { Notion } = require("@neurosity/notion");

const notion = new Notion({
  autoSelectDevice: false,
  emulator: process.env?.NEUROSITY_ENABLE_SDK_EMULATOR === "true"
});

exports.handler = async function (event) {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        errorMessage: "Method Not Allowed"
      }),
      headers: { Allow: "GET" }
    };
  }

  console.log(
    "env vars",
    JSON.stringify(
      {
        NEUROSITY_OAUTH_CLIENT_ID: process.env.NEUROSITY_OAUTH_CLIENT_ID,
        NEUROSITY_OAUTH_CLIENT_SECRET:
          process.env.NEUROSITY_OAUTH_CLIENT_SECRET,
        NEUROSITY_OAUTH_CLIENT_REDIRECT_URI:
          process.env.NEUROSITY_OAUTH_CLIENT_REDIRECT_URI,
        NEUROSITY_ENABLE_SDK_EMULATOR: process.env.NEUROSITY_ENABLE_SDK_EMULATOR
      },
      null,
      2
    )
  );

  if (isMissingEnvVars()) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        errorMessage: `Function is missing the Neurosity environment variables.`
      })
    };
  }

  return notion
    .createOAuthURL({
      clientId: process.env.NEUROSITY_OAUTH_CLIENT_ID,
      clientSecret: process.env.NEUROSITY_OAUTH_CLIENT_SECRET,
      redirectUri: process.env.NEUROSITY_OAUTH_CLIENT_REDIRECT_URI,
      responseType: "token", // token | code
      state: getState(),
      scope: getScopes()
    })
    .then((url) => ({
      statusCode: 200,
      body: JSON.stringify({ url })
    }))
    .catch((error) => ({
      statusCode: 400,
      body: JSON.stringify(error.response.data)
    }));
};

function getState() {
  return Math.random().toString().split(".")[1];
}

function getScopes() {
  return [
    "read:devices-status",
    "read:devices-info",
    "read:brainwaves",
    "read:signal-quality",
    "read:accelerometer"
    /* All other possible scopes */
    // "read:devices-settings",
    // "write:devices-settings",
    // "write:wifi-settings",
    // "write:haptics",
    // "write:brainwave-markers",
    // "write:brainwaves",
    // "read:memories:brainwaves",
    // "read:calm",
    // "read:memories:calm",
    // "read:focus",
    // "read:memories:focus",
    // "read:kinesis",
    // "write:kinesis",
  ];
}

function isMissingEnvVars() {
  return (
    !process.env?.NEUROSITY_OAUTH_CLIENT_ID ||
    !process.env?.NEUROSITY_OAUTH_CLIENT_SECRET ||
    !process.env?.NEUROSITY_OAUTH_CLIENT_REDIRECT_URI
  );
}
