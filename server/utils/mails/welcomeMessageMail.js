const nodeMailer = require("nodemailer");

const welcomeMessageMail = async ({ name, email }) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: `Welcome ${name} to Amorée Scents – A World of Elegance Awaits`,
    html: `
      <div style=" color: #333; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <div style="padding: 20px; text-align: center; background-color: #e0f7fa;">
            <h1 style="margin: 0; color: #00796b;">Welcome to Amorée Scents</h1>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px; line-height: 1.5;">
              Hello, ${name}!
            </p>
            <p style="font-size: 16px; line-height: 1.5;">
              Congratulations and welcome to the exclusive Amorée Scents family!
            </p>
            <p style="font-size: 16px; line-height: 1.5;">
              You’ve just taken the first step into a realm where luxury meets elegance, and every scent tells a story. We're excited to have you with us and can't wait for you to indulge in our carefully crafted fragrances that will elevate your senses and leave a lasting impression.
            </p>
            <h2 style="color: #00796b; font-size: 18px;">Here's what you can expect:</h2>
            <ul style="font-size: 16px; line-height: 1.5; padding-left: 20px;">
              <li>Exclusive access to our latest collections.</li>
              <li>Special offers and members-only promotions.</li>
              <li>A seamless shopping experience tailored just for you.</li>
            </ul>
            <p style="font-size: 16px; line-height: 1.5;">
              We're here to make every moment memorable. If you have any questions or need assistance, our team is just an email away.
            </p>
            <p style="font-size: 16px; line-height: 1.5; text-align: center; color: #00796b;">
              Stay tuned for exciting updates and get ready to redefine your scent experience.
            </p>
          </div>
          <div style="padding: 20px; text-align: center; background-color: #e0f7fa;">
            <p style="margin: 0; font-size: 14px; color: #555;">Warm regards,</p>
            <p style="margin: 0; font-size: 14px; color: #555;"><strong>The Amorée Scents Team</strong></p>
            <p style="margin: 0; font-size: 14px; color: #00796b;">Experience Elegance, Breathe Luxury</p>
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = welcomeMessageMail;
