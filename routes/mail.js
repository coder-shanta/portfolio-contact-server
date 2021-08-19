const Router = require('@koa/router')
const nodemailer = require('nodemailer')
const validate = require('validate.js');

const route = new Router({
    prefix: '/mail'
})

route.post('/send',async (ctx, next) => {

    const data = ctx.request.body

    const constraints = {
        name: {
            presence: true
        },
        email: {
            presence: true,
            email: true
        },
        subject: {
            presence: true
        },
        message: {
            presence: true
        }
    };

    const error = validate(data, constraints);

    if (error)
        return (ctx.body = {
            success: false,
            error
        });

    
    let html = `

    <table border="1">
        <tr>
        <th>Name</th>
        <td>${data.name}</td>
        </tr>
        <tr>
        <th>Email</th>
        <td>${data.email}</td>
        </tr>
        <tr>
        <th>Message</th>
        <td>${data.message}</td>
        </tr>
    </table>
    `
    

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS
        }
    })

    let info = await transporter.sendMail({
        from: `"Portfolio Site" <${process.env.SMTP_EMAIL}>`,
        to: process.env.TO_MAIL,
        subject: data.subject,
        html: html
    })

    return (ctx.body = {
        success: true
    });

})

module.exports = route