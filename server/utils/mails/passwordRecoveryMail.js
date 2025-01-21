const nodeMailer = require("nodemailer");

const passwordRecoveryMail = async (options) => {

    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        secure: true,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: options.email,
        subject: options.subject + ' || Amorée Scents',
        text: options.message
    };

    await transporter.sendMail(mailOptions);

}

module.exports = passwordRecoveryMail