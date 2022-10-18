import 'dotenv/config'
import { Server as HttpServer } from 'http';
import express from 'express';
import products from './src/routes/products.js'
import cart from './src/routes/cart.js'
import users from './src/routes/users.js'
// import graphql from './src/routes/graphql.js'
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo'
import session from 'express-session';
import passport from './passport.js';
import parseArgs from 'minimist';
import os from 'os'
import compression from 'compression';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {container} from './dependencies.js'
// const logInConsole = container.resolve('logInConsole');
// const logWarn = container.resolve('logWarn');
// const logError = container.resolve('logError');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { mode } = parseArgs(process.argv, { default: { mode: "fork" } });
const port = parseInt(process.env.PORT) || 8080
const processId = process.pid;
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs.log'), { flags: 'a' })
const app = express();
// app.use(logInConsole)
app.use(morgan('dev', { stream: accessLogStream }))
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
app.use('/api/cart', cart)
app.use('/api/users', users)
// app.use(logWarn);
// app.use(logError);
// app.use(graphql)
const httpServer = new HttpServer(app);
app.use(express.static('public'));
app.engine(
    'hbs',
    engine({
        extname: '.hbs'
    })
)

httpServer.listen(port, () => {
    console.log(`Listening on port ${port}! and process Id: ${processId}`)
});

export default app;

