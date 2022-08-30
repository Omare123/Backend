import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import express from 'express';
import products from './routes/products.js'
import chat from './routes/chat.js'
import cart from './routes/cart.js'
import users from './routes/users.js'
import { engine } from 'express-handlebars';
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
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { mode } = parseArgs(process.argv, { default: { mode: 'fork' } });
const port = parseInt(process.env.PORT) || 8080
const processId = process.pid;
const numeroCpus = os.cpus().length;
const baseURL = process.env.BASE_URL || `http://localhost:${port}/`
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs.log'), { flags: 'a' })

function startApp() {
    const app = express();
    app.use(morgan('dev', { stream: accessLogStream }))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
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
    app.set('view engine', 'hbs');
    app.set('views', './public');
    app.use('/api/products', products)
    app.use('/api/chat', chat)
    app.use('/api/cart', cart)
    app.use('/api/users', users)
    
    const httpServer = new HttpServer(app);
    const socketServer = new SocketServer(httpServer);
    app.use(express.static('public'));
    app.engine(
        'hbs',
        engine({
            extname: '.hbs'
        })
    )


    // socketServer.on('connection', (socket) => {
    //     getAllProducts().then((response) => {
    //         socket.emit('products', response);
    //     });
    //     socket.on('new_product', (newProduct) => {
    //         socketServer.sockets.emit('product', newProduct)
    //     })
    //     socket.on('add_product', (addedProduct) => {
    //         socketServer.sockets.emit('add_product', addedProduct)
    //     })
    // });

    const getAllProducts = async () => {
        return await allProducts
    }
    httpServer.listen(port, () => {
        console.log(`Listening on port ${port}! and process Id: ${processId}`)
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

