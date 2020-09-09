"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  
    let confirmationLink = 'localhost:3000';
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Luís Barros 👻" <luisdanielbarros@protonmail.com>', // sender address
      to: "luisdanielbarros@protonmail.com", // list of receivers
      subject: "Confirm your Email Address", // Subject line
      text: "Confirm your Email Address to active your account and be able to login.", // plain text body
      html: "<a href='"+confirmationLink+"'>Confirmation Link</a><p>Alternatively, you can copy & paste the following URL: "+confirmationLink+"</p>", // html body
    });
  
    console.log("Confirmation email sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);