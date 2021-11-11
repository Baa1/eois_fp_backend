const nodemailer = require('nodemailer')

exports.sendEmail = (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'iq.eois.fp@gmail.com',
          pass: 'hf,jnfq555'
        }
    })

    const mailOptions = {
        from: 'iq.eois.fp@gmail.com',
        to,
        subject,
        text
    }
    console.log(mailOptions)
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
    })
}
