import pino from 'pino';

const consoleLogger = pino();
const warnLogger = pino({level: 'warn'}, pino.destination('./warn.log'))
const errorLogger = pino({level: 'error'}, pino.destination('./error.log'))

export const logWarn = (req, res, next) => {
    warnLogger.warn(`${req.path} no es una ruta esperada`);
    next();
}

export  const logError = (err, req, res, next) => {
    if (err){
        errorLogger.error(err.message);
        res.send(err.message);
    }
}

export const logInConsole = (req, res, next)=> {
    // consoleLogger.info(`${req.path}`)
    next();
};