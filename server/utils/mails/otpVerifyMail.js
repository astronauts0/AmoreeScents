const nodeMailer = require('nodemailer');

const otpVerifyMail = async (email, otp) => {
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

    // Modern HTML Email Template
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Order OTP Verification Code || Amorée Scents",
      html: `
            <div style="font-family: 'Arial', sans-serif; background-color: #f4f7fc; padding: 20px; text-align: center;">
                <div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #333333;">Your OTP Code</h2>
                    <p style="font-size: 16px; color: #555555;">We received a request to verify your email. Please use the OTP below to complete your verification process.</p>
                    <p style="font-size: 18px; color: #00796b;">Expire in 5 minutes.</p>
                    <div style="background-color: #e0f7fa; color: #00796b; padding: 15px 30px; font-size: 20px; font-weight: bold; border-radius: 5px; margin: 20px 0;">
                        ${otp}
                    </div>
                    <p style="font-size: 14px; color: #888888;">If you did not request this, please ignore this email.</p>
                    <footer style="margin-top: 20px; font-size: 12px; color: #aaaaaa;">
                        <p>&copy; ${new Date().getFullYear()} Amorée Scents All rights reserved.</p>
                    </footer>
                </div>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);

};

module.exports = otpVerifyMail;