const Mailgen = require("mailgen");

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "development":
        this.link = "https://6a59-77-123-189-179.ngrok.io";
        break;

      case "production":
        this.link = "link for production";
        break;

      default:
        this.link = "https://6a59-77-123-189-179.ngrok.io";
        break;
    }
  }

  createTemplateEmail(email, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: "salted",
      product: {
        name: "GOIT",
        link: this.link,
      },
    });
    const customEmail = {
      body: {
        email,
        intro: "Welcome to GOIT! We're very excited to have you on board.",
        action: {
          instructions:
            "To get started with GOIT  CONTACT Book, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    };
    return mailGenerator.generate(customEmail);
  }

  async sendVerifyEmail(email, verifyToken) {
    const emailHTML = this.createTemplateEmail(email, verifyToken);
    const msg = {
      to: email,
      subject: "Please verify your email",
      html: emailHTML,
    };
    try {
      const result = await this.sender.send(msg);
      console.log(`result`, result);
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }
}

module.exports = EmailService;
