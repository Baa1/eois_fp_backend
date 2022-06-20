const nodemailer = require('nodemailer')

exports.sendEmail = (to, subject, text) => {
  
  let transporterCreate = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'kvezee01@mail.ru',
        pass: '8keAcFQHrwDxJ34aZ9pT',
    }
  });
 
  let message = {
    from: 'kvezee01@mail.ru',
    to,
    subject,
    text
  };

  transporterCreate.sendMail(message, (error, info) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Email sent: ' + info.response)
    }
  });
}

// exports.sendEmail = (to, subject, text) => {
//   const transporter = nodemailer.createTransport({
//     service: 'ethereal',
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD
//     }
//   })

//   const mailOptions = {
//     from: 'joana.leannon15@ethereal.email',
//     to,
//     subject,
//     text
//   }
  
//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       console.log(error)
//     } else {
//       console.log('Email sent: ' + info.response)
//     }
//   })
// }
