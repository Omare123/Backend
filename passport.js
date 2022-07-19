import passport from 'passport';
import Strategy from 'passport-local';
import bcrypt from 'bcrypt';
import UserDaoMongodb from './src/daos/UserDaoMongodb.js'
const userService = new UserDaoMongodb()


passport.use('registration', new Strategy(async (username, password, callback) => {
    const user = await userService.getByparameter(username, 'username');
    if (user) return callback(new Error('Ya existe un usuario con ese nombre'));
    const passwordHasheado = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const usuarioCreado = { username, password: passwordHasheado };
    await userService.save(usuarioCreado);
    callback(null, usuarioCreado);
}));

passport.use('athentication', new Strategy(async (username, password, callback) => {
    const user = await userService.getByparameter(username, 'username');
    if (!user || !bcrypt.compareSync(password, user.password)) return callback(new Error('Usuario no existente o password incorrecto'));
    callback(null, user);
}));

passport.serializeUser((usuario, callback) => {
    callback(null, usuario.username);
});

passport.deserializeUser((username, callback) => {
    const user = users.find(usr => usr.username == username);
    callback(null, user);
});

export default passport;