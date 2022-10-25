import 'dotenv/config'
import { Server as HttpServer } from 'http';
import express from 'express';
import products from './src/routes/products.js'
import upload from './src/routes/upload.js'
import cart from './src/routes/cart.js'
import users from './src/routes/users.js'
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo'
import session from 'express-session';
import passport from './passport.js';
import parseArgs from 'minimist';
import compression from 'compression';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server as SocketServer } from 'socket.io'
import { container } from './dependencies.js'
const chatService = container.resolve('chatService')

const port = parseInt(process.env.PORT) || 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(session({
    store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION, mongoOptions: advancedOptions }),
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
app.set('views', './public');
app.use('/api/products', products)
app.use('/api/upload', upload)
app.use('/api/cart', cart)
app.use('/api/users', users)
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);
socketServer.on('connection', (socket) => {
    //is this save??
    chatService.getAll().then(messages => {
        socket.emit('messages', messages);
    });
    socket.on('new_message', async (newMessage) => {
        console.log(newMessage)
        await chatService.save(newMessage);
        socketServer.sockets.emit('message', newMessage);
    })
});
app.use(express.static('public'));
app.engine(
    'hbs',
    engine({
        extname: '.hbs'
    })
)

httpServer.listen(port, () => {
    console.log(`Listening on port ${port}!`)
});

export default app;

