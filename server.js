import 'dotenv/config'
import { Server as HttpServer } from 'http';
import serve from "koa-static";
import Koa from 'koa'
import json from 'koa-json';
import products from './src/routes/products.js'
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { mode } = parseArgs(process.argv, { default: { mode: "fork" } });
const port = parseInt(process.env.PORT) || 8080
const processId = process.pid;
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs.log'), { flags: 'a' })
const app = new Koa();
app.use(morgan('dev', { stream: accessLogStream }))
app.use(json());
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
app.use(products.routes())
app.use(cart.routes())
app.use(users.routes())
const httpServer = new HttpServer(app);
app.use(serve(__dirname + "/public"));


httpServer.listen(port, () => {
    console.log(`Listening on port ${port}! and process Id: ${processId}`)
});

export default app;

