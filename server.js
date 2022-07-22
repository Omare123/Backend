import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import express from 'express';
import products from './routes/products.js'
import chat from './routes/chat.js'
import users from './routes/users.js'
import {engine} from 'express-handlebars';
import axios from 'axios';
import allProducts from './routes/productsTest.js'
import dbConnections from "./config.js"
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo'
import session from 'express-session';
import passport from './passport.js';
const app = express();
app.use(express.json())
app.use(cookieParser());
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
app.use(session({
  store: MongoStore.create({ mongoUrl: dbConnections.mongoDb, mongoOptions: advancedOptions }),
  secret: 'ecommerce',
  resave: true,
  cookie: {
    maxAge: 600000
  },
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'hbs');
app.set('views', './public/views');
app.use('/api/productos', products)
app.use('/api/chat', chat)
app.use('/api/users', users)
app.use((error, req, res, next) => {
    if(error)
        res.status(500).send(error.message);
})
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);
app.use(express.static('public'));
app.engine(
    'hbs',
    engine({
        extname: '.hbs'
    })
)


socketServer.on('connection', (socket) => {
    getAllMessages().then((response) => {
        socket.emit('messages', response);

    });
    socket.on('new_message', (newMessage) => {
        socketServer.sockets.emit('message', newMessage)
    })
    getAllProducts().then((response) => {
        socket.emit('products', response);

    });
    socket.on('new_product', (newProduct) => {
        socketServer.sockets.emit('product', newProduct)
    })
});

const getAllProducts = async () => {
    const callProducts = await allProducts
    return callProducts;
}

const getAllMessages = async () => {
    const allChat = (await axios.get('http://localhost:8080/api/chat')).data
    return allChat;
}
httpServer.listen(8080, () => {
    console.log('Listening on port 8080!')
});
