import { createTransport } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path'

const handlebarOptions = {
    viewEngine: {
        extName: ".hbs",
        partialsDir: path.resolve("./assets"),
        defaultLayout: false,
    },
    viewPath: path.resolve("./assets"),
    extName: ".hbs"
}
const trasporter = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS,
    },
})
trasporter.use("compile", hbs(handlebarOptions))
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
export const mailer = (template, context, subject , to) => {
    const mailOptios = {
        from: sender,
        to: to,
        subject: subject, 
        template: template,
        context: context
    }
    trasporter.sendMail(mailOptios)
}