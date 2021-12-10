const nodemailer = require('nodemailer')

exports.sendEmail = (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: 'iq.eois.fp@gmail.com',
    to,
    subject,
    text
  }
  
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}
