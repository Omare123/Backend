import { createTransport } from 'nodemailer';
const trasporter = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS,
    },
})
const sender = process.env.MAIL_AUTH_USER;
export const inicialMailer = ({username, password, direction, name, age, phone}) => {
    trasporter.sendMail({
        from: `${sender} <${sender}>`, // sender address
        to: username, // list of receivers
        subject: "Bienvenido", // Subject line
        text: "info", // plain text body
        html: `<div>correo: ${username}, contraseña: ${password}, nombre: ${name}, edad: ${age}, número de teléfono: ${phone}, dirección: ${direction} </div>`, // html body
    }).catch(err => {
        throw err
    })
        
}
export const mailer = ({html, subject , to}) => {
    trasporter.sendMail({
        from: `${sender} <${sender}>`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: subject, // plain text body
        html: html, // html body
    })
}