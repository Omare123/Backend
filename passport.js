import passport from 'passport';
import Strategy from 'passport-local';
import bcrypt from 'bcrypt';
import UserDaoMongodb from './src/daos/UserDaoMongodb.js'
const userService = new UserDaoMongodb()


passport.use('registration', new Strategy({passReqToCallback: true}, async (req, username, password, callback) => {
    try{
        const user = await userService.getByparameter(username, 'username');
        if (user) return callback('Ya existe un usuario con ese nombre');
        const hasedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const createdUser = { ...req.body, password: hasedPass, photo: req.file.filename};
        await userService.save(createdUser);
        callback(null, createdUser);
    }
    catch(err) {
        console.log(err)
    }
    
}));

passport.use('login', new Strategy(async (username, password, callback) => {
    const user = await userService.getByparameter(username, 'username');
    if (!user || !bcrypt.compareSync(password, user.password)) return callback('Usuario no existente o password incorrecto');
    callback(null, user);
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