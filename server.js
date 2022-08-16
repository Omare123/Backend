import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import express from 'express';
import products from './routes/products.js'
import chat from './routes/chat.js'
import users from './routes/users.js'
import info from './routes/info.js'
import random from './routes/random.js'
import { engine } from 'express-handlebars';
import axios from 'axios';
import allProducts from './routes/productsTest.js'
import dbConnections from "./config.js"
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo'
import session from 'express-session';
import passport from './passport.js';
import parseArgs from 'minimist';
import cluster from 'cluster';
import os from 'os'
import compression from 'compression';
import pino from 'pino';

const { mode } = parseArgs(process.argv, { alias: { 'p': 'port' }, default: { mode: 'fork' } });
const processId = process.pid;
const numeroCpus = os.cpus().length;

function startApp() {
    const { port } = parseArgs(process.argv, { alias: { 'p': 'port' }, default: { mode: 'fork' } });
    const consoleLogger = pino();
    const warnLogger = pino({level: 'warn'}, pino.destination('./warn.log'))
    const errorLogger = pino({level: 'error'}, pino.destination('./error.log'))
    const app = express();
    const logWarn = (req, res, next) => {
        warnLogger.warn(`${req.path} no es una ruta esperada`);
        next();
    }
    const logError = (err, req, res, next) => {
        if (err){
            errorLogger.error(err.message);
            res.send(err.message);
        }
    }
    app.use(express.json());
    app.use(cookieParser());
    app.use(compression());
    const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
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
    app.use((req, res, next)=> {
        consoleLogger.info(`${req.path}`)
        next();
    })
    app.set('view engine', 'hbs');
    app.set('views', './public/views');
    app.use('/api/productos', products)
    app.use('/api/chat', chat)
    app.use('/api/users', users)
    app.use('/api/info', info)
    app.use('/api/randoms', random)
    app.use(logWarn);
    app.use(logError);
    
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
        const allChat = (await axios.get('http://localhost:80/api/chat')).data
        return allChat;
    }
    httpServer.listen(8080, () => {
        console.log(`Listening on port ${8080}! and process Id: ${processId}`)
    });
}
if (mode === 'fork') {
    if (cluster.isPrimary) {
        for (let i = 0; i < numeroCpus; i++) {
            cluster.fork();
        }
        cluster.on('exit', (worker) => {
            console.log(`Proceso worker con PID ${worker.process.pid} salio`);
        });
    }
    else
        startApp()
}
else
    startApp()

