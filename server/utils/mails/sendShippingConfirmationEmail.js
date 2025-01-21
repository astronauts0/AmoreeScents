const nodeMailer = require('nodemailer');

const sendShippingConfirmationEmail = async ({ email, name, orderId, orderItems, totalAmount }) => {
    try {
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

        const orderItemsHtml = orderItems.map(item => `
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">
                    <a href="${item.productUrl}" style="color: #4CAF50; text-decoration: none;">${item.name}</a>
                </td>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.qty}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">Rs ${item.price}</td>
            </tr>
        `).join('');

        const mailOptions = {
          from: process.env.SMTP_EMAIL,
          to: email,
          subject: `Your Order has been Shipped - ${orderId} || Amorée Scents`,
          html: `
                <div style="text-align: center; font-family: Arial, sans-serif; padding: 20px;">
                    <h1 style="color: #4CAF50;">Your order has been shipped, ${name}!</h1>
                    <h2>Your order is on its way! [Please have your payment ready] Our delivery personnel will arrive at your doorstep soon.</h2>

                    <p>Here are the details:</p>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background-color: #f9f9f9;">
                            <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Product</td>
                            <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Quantity</td>
                            <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Price</td>
                        </tr>
                        ${orderItemsHtml}
                        <tr style="background-color: #f9f9f9;">
                            <td colspan="2" style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Total Amount</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">Rs ${totalAmount}</td>
                        </tr>
                    </table>
                    <h3>If you haven't received an email, please check your <span style="color: #DE3163;"><strong>Spam</strong></span> folder.</h3>
                    <p>If you have any questions or concerns, feel free to contact us.</p>
                    <p>Thank you for shopping with us!</p>
                    <p>Best Regards from <strong><i>Amorée Scents</i></strong></p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error(`Error sending shipping confirmation email:`, error);
        throw new Error(error.message);
    }
};

module.exports = sendShippingConfirmationEmail;
