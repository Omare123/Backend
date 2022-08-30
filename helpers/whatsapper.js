import twilio from "twilio";
const cliente = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKE);
const fromNumber = process.env.WHATSAPP_PHONE;

export const whatsapper = async ({body, toNumber}) => {
    const send = await cliente.messages.create({
        to: `whatsapp:+54${toNumber}`,
        from: fromNumber,
        body: body,
    }).catch(err => console.log(err))
}