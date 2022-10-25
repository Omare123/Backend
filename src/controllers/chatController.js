
class ChatController {
    constructor({ chatService }) {
      this.chatService = chatService;
    } 
    getAll = async (username) => {
      return await this.chatService.getCart(username)
    }

    getByUser = async (username) => {
        return await this.chatService.getByUser(username)
      }

    add = async (message) => {
      await this.chatService.add(message)
    }
  }
  
  export default ChatController;