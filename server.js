const express = require('express');
const app = express();
const {Server: HttpServer} = require('http');
const {Server: SocketServer} = require('socket.io')
const Container = require('./src/models/Container') 
const { engine } = require('express-handlebars');
app.use(express.static('public'));
app.engine(
    'hbs',
    engine({
        extname: '.hbs'
    })
)
app.set('view engine', 'hbs');
app.set('views', './public/views');

const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

socketServer.on('connection', (socket) => {
    getAllMessages().then( messages => {
            socket.emit('messages', messages);
            socket.on('new_message', (newMessage) => {
                const file = new Container("Chat");
                file.save(newMessage);
                messages.push(newMessage);
                socketServer.sockets.emit('messages', messages)
        })});
    getAllProducts().then((products) => {
        socket.emit('product', products);
        socket.on('new_product', (newProduct) =>{
            const file = new Container("Archivo");
            file.save(newMessage);
            messages.push(newProduct);
            socketServer.sockets.emit('messages', messages)
        })
    });
});

const getAllProducts = async () => {
    const file = new Container("Archivo");
    products = await file.getAll();
    return products;
}

const getAllMessages = async () => {
    const file = new Container("Chat");
    chat = await file.getAll();
    return chat;
}

httpServer.listen(8080, ()=>{
    console.log("Estoy en 8080")
})