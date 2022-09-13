import { inicialMailer } from "../helpers/mailer.js"
import bcrypt from 'bcrypt';

class UserService {
    constructor({userDao}) {
        this.userDao = userDao;
    }

    getAll = async () => {
        return await this.userDao.getAll();
    }

    getUser = async (username) => {
        let user = await this.userDao.getByparameter(username, "username");
        delete user.password;
        return user
    }

    register = async () => {
        const user = await this.userDao.getByparameter(user.username, 'username');
        if (user) throw new Error("Ya existe un usuario con ese nombre")
        const hasedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const createdUser = { ...user, password: hasedPass };
        inicialMailer(user)
        return await this.userDao.save(createdUser);
    }

    login = async (username, password) => {
        const user = await this.userDao.getByparameter(username, 'username');
        if (!user || !bcrypt.compareSync(password, user.password)) throw new Error('Usuario no existente o contraseña incorrecta');
        else return user;
    }
}
export default UserService;