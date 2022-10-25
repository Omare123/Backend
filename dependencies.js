import { createContainer, InjectionMode, asClass, asValue, asFunction } from 'awilix'
import UserController from './src/controllers/usersController.js'
import UserDaoMongodb from './src/daos/UserDaoMongodb.js'
import UserService from './src/services/userService.js'
import CartDaoMongodb from './src/daos/CartDaoMongodb.js'
import CartService from './src/services/cartService.js'
import CartController from './src/controllers/cartController.js'
import ChatDaoMongodb from './src/daos/ChatDaoMongodb.js'
import ChatService from './src/services/ChatService.js'
import ChatController from './src/controllers/chatController.js'
import ProductDaoMongodb from './src/daos/ProductDaoMongodb.js'
import ProductService from './src/services/productService.js'
import ProductController from './src/controllers/productController.js'
import { upload } from './src/helpers/uploader.js'
export const container = createContainer({
    injectionMode: InjectionMode.PROXY
})

container.register({    
    userController: asClass(UserController),
    userDao: asClass(UserDaoMongodb),
    userService: asClass(UserService),
    cartController: asClass(CartController),
    cartDao: asClass(CartDaoMongodb),
    cartService: asClass(CartService),
    chatController: asClass(ChatController),
    chatDao: asClass(ChatDaoMongodb),
    chatService: asClass(ChatService),
    productController: asClass(ProductController),
    productDao: asClass(ProductDaoMongodb),
    productService: asClass(ProductService),
    db: asValue(process.env.DB_CONNECTION),
    upload: asValue(upload)
})

