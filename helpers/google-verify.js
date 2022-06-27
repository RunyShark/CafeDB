const { OAuth2Client } = require("google-auth-library");
const { GOOGLE_CLIENTE_ID } = process.env;
const client = new OAuth2Client(GOOGLE_CLIENTE_ID);

async function googleVerify(token = "") {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENTE_ID,
    });
    const { name, picture, email } = ticket.getPayload();

    return { name, picture, email };
  } catch (error) {
    console.log(error);
  }
}
module.exports = googleVerify;
