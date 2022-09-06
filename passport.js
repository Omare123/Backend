import passport from 'passport';
import Strategy from 'passport-local';
import UserService from './services/usersService';
const userService = new UserService()


passport.use('registration', new Strategy({passReqToCallback: true}, async (req, username, password, callback) => {
    try{
        req.body.photo = req.file.filename;
        const createdUser = await userService.register(req.body)
        callback(null, createdUser);
    }
    catch(err) {
        callback(err.message);
    }
    
}));

passport.use('login', new Strategy(async (username, password, callback) => {
    try{
        const user = await userService.login(username, password);
        callback(null, user);
    }
    catch(err) {
        return callback('Usuario no existente o password incorrecto');
    }
    
}));

passport.serializeUser((usuario, callback) => {
    callback(null, usuario.username);
});

passport.deserializeUser(async (username, callback) => {
    if(username){
        const user = await userService.getByparameter(username, 'username');
        callback(null, user);
    }
});

export default passport;