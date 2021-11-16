const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const prompt = require('prompt-sync')();
const userEmail = prompt("what is your Email");
const bot = require('.././figs.json');
const MAILERNAME = bot.MAILERNAME;
const MAILERPASS = bot.MAILERPASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
    auth: {
        user: MAILERNAME,
    pass: MAILERPASS
  }
});

/**
 * @class Email
 */
class Email {
  /**
   * @method send
   */
  static async send(msg, error = false) {
    console.log(`Sending email ${error ? "error alert" : "alert"}...`);

      transporter.sendMail({
          to: userEmail,
        from: MAILERNAME,
      subject: error ? "Scraper Error" : "Scraper Results",
      html: msg
    });

    console.log(`Data sent successfully.`);
  }
}

module.exports = Email;
