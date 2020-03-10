

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'pokharelsujan134@egmail.com',
//   from: 'pokharelsujan134@gmail.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);

const sendWelcomeEmail = (email, name )=>{
    sgMail.send({
        to:email,
        from: 'pokharelsujan134@gmail.com',
        subject: 'Thanks for joining in',
        text: ` Welcome to the app ${name}. Let me know how you get aling with the app`


    })
}
// to export multiple funcctions


const sendCancelationEmail = (email, name )=>{
    sgMail.send({
        to:email,
        from: 'pokharelsujan134@gmail.com',
        subject: 'Sorry to see you go!',
        text: ` GoodBye to the app ${name}. Hope to see you soon back`


    })
}

module.exports= {
    sendWelcomeEmail, sendCancelationEmail
}