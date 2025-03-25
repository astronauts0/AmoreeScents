const nodeMailer = require("nodemailer");

const sendOrderConfirmationEmail = async ({
  email,
  name,
  phoneNo,
  orderId,
  orderItems,
  totalAmount,
  shippingPrice,
}) => {
  try {
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

    const orderItemsHtml = orderItems
      .map(
        (item) => `
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">
                    <a
                      href="${process.env.FRONTEND_URL}/product/${item.slug}"
                      style="color: #00796b; text-decoration: underline;"
                    >
                      ${item.name}
                    </a>

                    ${
                      item?.attributes &&
                      Object.keys(item?.attributes).length > 0 &&
                      ` <div style="padding-top: 2.5px;">
                          ${Object.keys(item?.attributes)
                            .map(
                              (key) =>
                                `<div>
                                <strong>
                                  ${key.charAt(0).toUpperCase() + key.slice(1)}:
                                </strong>
                                <span style="background-color: #00796b; color: #e0f7fa; padding: 2px 5px; border-radius: 3px;">
                                  ${item?.attributes[key]}
                                </span>
                              </div>`
                            )
                            .join("")}
                        </div>`
                    }

                    ${
                      item?.color
                        ? `
                      <div style="display: flex; align-items: center; justify-content: center; gap: 5px; padding-top: 2.5px;">
                        <strong>Color: </strong>
                        <button style="width: 20px; height: 20px; background-color: ${item?.color}; border: 1px solid black; border-radius: 50%; display: inline-block;"></button>
                      </div>
                    `
                        : ""
                    }
                </td>
                <td style="padding: 10px; border: 1px solid #ddd;">${
                  item.qty
                }</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${
                  item.qty
                } X Rs ${item.price}</td>
            </tr>
    `
      )
      .join("");

    const mailOptionsForAdmin = {
      from: `${name} <${email}>`,
      to: process.env.SMTP_EMAIL,
      subject: `New Order Received - Order #${orderId} || Amorée Scents`,
      html: `
    <div style="padding: 20px; background-color: #f4f4f4; color: #333;">
      <h1 style="color: #00796b;">New Order Received</h1>
      <p>A new order has been placed:</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Order ID:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${orderId}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Customer Name:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Customer Phone:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${phoneNo}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Customer Email:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
        </tr>
      </table>
      
      <h2 style="color: #00796b;">Order Items</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f9f9f9;">
            <th style="padding: 10px; border: 1px solid #ddd;">Product</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Quantity</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${orderItemsHtml}
          <tr style="background-color: #f9f9f9;">
            <td colspan="2" style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Shipping Fee</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Rs ${shippingPrice}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td colspan="2" style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Total Amount</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Rs ${totalAmount}</td>
          </tr>
        </tbody>
      </table>
      
      <p>Please review the order and ensure timely processing.</p>
      <p>Best Regards, <strong><i>Amorée Scents</i></strong></p>
    </div>
  `,
    };

    // Mail for the user
    const mailOptionsForUser = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: `Order Confirmation - Order #${orderId} || Amorée Scents`,
      html: `
                <div style="text-align: center; padding: 20px;">
                    <h1 style="color: #00796b;">Thank You for Your Order, ${name}!</h1>
                    <h2>Your order has been placed successfully & is now being processed. The Order will be delivered within 2-5 working days. We appreciate your patience!</h2>
                    <p>Here are the details:</p>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background-color: #f9f9f9;">
                            <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Product</td>
                            <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Quantity</td>
                            <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Price</td>
                        </tr>
                        ${orderItemsHtml}
                        <tr style="background-color: #f9f9f9;">
                            <td colspan="2" style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">Shipping Fee</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">Rs ${shippingPrice}</td>
                        </tr>
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

    // Send emails
    await transporter.sendMail(mailOptionsForAdmin);
    await transporter.sendMail(mailOptionsForUser);
  } catch (error) {
    console.error(`Error sending order confirmation email:`, error);
    throw new Error(error.message);
  }
};

module.exports = sendOrderConfirmationEmail;
