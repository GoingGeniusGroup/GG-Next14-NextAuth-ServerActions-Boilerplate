"use server";
import nodemailer from "nodemailer";
import { response } from "./utils";

export async function sendInvoiceEmail(
  toEmail: string,
  invoiceId: string,
  fileContent: string
) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const buffer = Buffer.from(fileContent, "base64");

  const mailOptions = {
    from: '"Vendify" <vendifyshop@gmail.com>',
    to: toEmail,
    subject: `Invoice #${invoiceId}`,
    text: "Please find attached the invoice for your recent order.",
    attachments: [
      {
        filename: `invoice-${invoiceId}.pdf`,
        content: buffer,
        contentType: "application/pdf",
      },
    ],
  };
  try {
    await transport.verify();
    await transport.sendMail(mailOptions);
    return response({
      success: true,
      code: 200,
      message: "Invoice has been send to your email",
    });
  } catch (error) {
    console.error({ error });
    return response({
      success: false,
      error: {
        code: 500,
        message: "failed to send invoice",
      },
    });
  }
}
