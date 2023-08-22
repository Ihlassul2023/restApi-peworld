const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "mail.project13.my.id",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (email_client, name, url) => {
    let mailOption = {
        from: process.env.EMAIL_NAME,
        to: email_client,
        subject: `Activation email for ${name}`,
        html: `Hallo <b>${name}</b>, this is your link for activating the account: <i><a href="${url}">Click Here</a><i>`,
    };

    try {
        let info = await transporter.sendMail(mailOption);
        console.log("Email sent:", info.response);
        return info.response;
    } catch (error) {
        console.log("Error sending email:", error);
        throw error;
    }
};

module.exports = sendEmail;
