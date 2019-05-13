const express = require('express');
const router = express.Router();
const passport = require("passport");
const nodemailer = require('nodemailer');
const Ticket = require('../../models/Ticket.js');

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();
//  /api/emails/
//notify user and admin that ticket has been created
var transporter = nodemailer.createTransport( {
    host: 'smtp.gmail.com',
    auth: {
        user: 'jinyantan109@gmail.com',
        pass: '5847362514'                  
    }
})
transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });

  let transporterAdmin = nodemailer.createTransport( {
    service:'Gmail',
    auth: {
        user: 'jinyantan109@gmail.com',
        pass: '5847362514'
    }
})

// const htmlEmailTemplateAdmin = `
//     <h3>User has created a new ticket..</h3>
//     <ul>
//         <li>ID: ${req.body.id}</li>
//         <li>Title: ${req.body.title}</li>
//     </ul>
//     <h3>Message</h3>
//     <p>${req.body.description}</p>
// ` 

// let mailOptionsAdmin = { //send to admin
//     from: "jinyantan109@gmail.com", // sender address
//     to: "jiaconger@gmail.com", // list of receivers
//     subject: "New ticket", // Subject line
//     //text: "testing", // plain text body
//     html: htmlEmailTemplateAdmin // html body
// }

// transporterAdmin.sendMail(mailOptionsAdmin, (err, info) => {
//     if (err) {
//         return console.log(err);
//     }
// })



router.post("/createticketemail", passport.authenticate('jwt', { session:false }), (req,res) => {
    const htmlEmailTemplate = `
<h3>Ticket has been created successfully.</h3>
<ul>
    <li>ID: ${req.body.id}</li>
    <li>Title: ${req.body.title}</li>
</ul>
<h3>Message</h3>
<p>${req.body.description}</p>
` 

    let mailOptions = { //send to user
        from: req.body.name, // sender address
        to: req.body.email, // list of receivers
        subject: "Ticket Created", // Subject line
        //text: "testing", // plain text body
        html: htmlEmailTemplate // html body
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err);
        }
    }) 

}) 

router.post("/acceptticketemail", passport.authenticate('jwt', { session:false }), (req,res) => {
    const htmlEmailTemplate = `
        <h3>Ticket has been acceptd by admin</h3>
        <ul>
            <li>ID: ${req.body.id}</li>
            <li>Title: ${req.body.title}</li>
        </ul>
        <p>Your ticket is currently being processed by ${req.body.adminName}.</p>
        <p>The admin will contact you soon or you can contact the admin at ${req.body.adminemail}.</p>
        <p>Thank you!</p>
        
    ` 

    let mailOptions = { //send to user
        from: req.body.name, // sender address
        to: req.body.email, // list of receivers
        subject: "Ticket Accepted", // Subject line
        //text: "testing", // plain text body
        html: htmlEmailTemplate // html body
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err);
        }
    }) 

}) 
router.post("/admin/acceptticketemail", passport.authenticate('jwt', { session:false }), (req,res) => {
    const htmlEmailTemplate = `
        <h3>You have accepted the following ticket</h3>
        <ul>
            <li>ID: ${req.body.id}</li>
            <li>Title: ${req.body.title}</li>
        </ul>
        <p>This ticket's user is ${req.body.userName}.</p>
        <p>Please contact the user at ${req.body.email} to follow up on this case.</p>
        <p>Thank you!</p>
        
    ` 

    let mailOptions = { //send to user
        from: req.body.name, // sender address
        to: req.body.adminemail, // list of receivers
        subject: "Accept Ticket ", // Subject line
        html: htmlEmailTemplate // html body
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err);
        }
    }) 

});

router.post("/completeticketemail", passport.authenticate('jwt', { session:false }), (req,res) => {
    const htmlEmailTemplate = `
        <h3>The following ticket is resolved</h3>
        <ul>
            <li>ID: ${req.body.id}</li>
            <li>Title: ${req.body.title}</li>
        </ul>
        <p>This ticket is resolved.</p>
        <p>Please contact the admin at ${req.body.adminEmail} if you still have any questions.</p>
        <p>Thank you!</p>
        
    ` 

    let mailOptions = { //send to user
        from: req.body.name, // sender address
        to: req.body.email, // list of receivers
        subject: "Ticket resolved", // Subject line
        html: htmlEmailTemplate // html body
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err);
        }
    }) 

});

router.post("/admin/completeticketemail", passport.authenticate('jwt', { session:false }), (req,res) => {
    const htmlEmailTemplate = `
        <h3>The following ticket is resolved</h3>
        <ul>
            <li>ID: ${req.body.id}</li>
            <li>Title: ${req.body.title}</li>
        </ul>
        <p>This ticket is resolved.</p>
        <p>Please contact the admin at ${req.body.adminEmail} if you still have any questions.</p>
        <p>Thank you!</p>
    ` 

    let mailOptions = { //send to user
        from: req.body.name, // sender address
        to: req.body.email, // list of receivers
        subject: "Ticket resolved", // Subject line
        html: htmlEmailTemplate // html body
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err);
        }
    }) 

});
module.exports = router;


