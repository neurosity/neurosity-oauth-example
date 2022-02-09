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

  if (isMissingEnvVars()) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        errorMessage: `Function is missing the Neurosity environment variables.`
      })
    };
  }

  const userId = event.queryStringParameters?.userId;

  console.log("userId", userId);

  return notion
    .getOAuthToken({
      clientId: process.env.NEUROSITY_OAUTH_CLIENT_ID,
      clientSecret: process.env.NEUROSITY_OAUTH_CLIENT_SECRET,
      userId
    })
    .then((token) => ({
      statusCode: 200,
      body: JSON.stringify(token)
    }))
    .catch((error) => ({
      statusCode: 200,
      body: JSON.stringify(error.response.data)
    }));
};

function isMissingEnvVars() {
  return (
    !process.env?.NEUROSITY_OAUTH_CLIENT_ID ||
    !process.env?.NEUROSITY_OAUTH_CLIENT_SECRET
  );
}
