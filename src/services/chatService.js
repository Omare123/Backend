import { messageDTO } from '../helpers/DTOS.js'

class ChatService {
    constructor({chatDao}) {
        this.chatDao = chatDao;
    }

    getAll = async () => {
        return await this.chatDao.getAll();
    }

    getByUser = async (username) => {
        let messages = await this.chatDao.getByparameter(username, "username");
        return messages;
    }
    
    save = async (newMessage) => {
        let message = messageDTO(newMessage)
        await this.chatDao.save(message);
        return message;
    }

}
export default ChatService;