
class UserController {
  constructor({userService}) {
    this.userService = userService
  }

  getUser = async (username) => {
    if (username === undefined)
      return await this.userService.getAll();
    else
      return await this.userService.getUser(username)
  }
}

export default UserController;