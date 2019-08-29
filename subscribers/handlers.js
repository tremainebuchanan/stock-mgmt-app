const request = require('request');

const key = process.env.EMAIL_KEY;
const url = process.env.EMAIL_URL;
/**
 * Sends email to recipient.
 * @param {*} data Recipient details
 */
const sendEmail = (data) => {
  request.post(url, {
    json: {
      key,
      to: data.to,
      name: data.name,
      password: data.password,
      username: data.username,
    },
  }, (error, response, body) => {
    // console.log(error);
    console.log(response.body);
    // console.log(body);
  });
};

module.exports = sendEmail;
