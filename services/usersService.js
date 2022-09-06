import UserDao from '../src/daos/UserDaoMongodb.js'
import { inicialMailer } from "../helpers/mailer.js"
import bcrypt from 'bcrypt';
const userDao = new UserDao();

class UserService {
    constructor() {
    }

    getAll = async () => {
        return await userDao.getAll();
    }

    getUser = async (username) => {
        let user = await userDao.getByparameter(username, "username");
        delete user.password;
        return user
    }

    register = async (user) => {
        const user = await userDao.getByparameter(user.username, 'username');
        if (user) throw new Error("Ya existe un usuario con ese nombre")
        const hasedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const createdUser = { ...user, password: hasedPass };
        inicialMailer(user)
        return await userDao.save(createdUser);
    }

    login = async (username, password) => {
        const user = await userService.getByparameter(username, 'username');
        if (!user || !bcrypt.compareSync(password, user.password)) throw new Error('Usuario no existente o contraseña incorrecta');
        else return user;
    }
}

export default UserService;