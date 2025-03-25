const nodeMailer = require("nodemailer");

const sendShippingConfirmationEmail = async ({
  email,
  name,
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

                ${(() => {
                  const attributesData =
                    item?.attributes instanceof Map
                      ? [...item?.attributes.entries()]
                      : Object.entries(item?.attributes || {});

                  return attributesData.length > 0
                    ? ` <div style="padding-top: 2.5px;">
                          ${attributesData
                            .map(
                              ([key, value]) =>
                                `<div>
                                <strong>
                                  ${key.charAt(0).toUpperCase() + key.slice(1)}:
                                </strong>
                                <span style="background-color: #00796b; color: #e0f7fa; padding: 2px 5px; border-radius: 3px;">
                                  ${value}
                                </span>
                              </div>`
                            )
                            .join("")}
                        </div>`
                    : "";
                })()}

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
            <td style="padding: 10px; border: 1px solid #ddd;">${item.qty}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              item.qty
            } X Rs ${item.price}</td>
        </tr>
    `
      )
      .join("");

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: `Your Order has been Shipped - ${orderId} || Amorée Scents`,
      html: `
                <div style="text-align: center;  padding: 20px;">
                    <h1 style="color: #00796b;">Your order has been shipped, ${name}!</h1>
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

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending shipping confirmation email:`, error);
    throw new Error(error.message);
  }
};

module.exports = sendShippingConfirmationEmail;
