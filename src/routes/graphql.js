import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
const router = express.Router();
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import {container} from '../../dependencies.js';
const cartController = container.resolve('cartController');
const productController = container.resolve('productController');
const userController = container.resolve('userController');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaString = fs.readFileSync(path.join(__dirname, '../schemas/graphqlSchema.gql')).toString();
const compiledSchema = buildSchema(schemaString);

const graphMiddleware = graphqlHTTP({
    schema: compiledSchema,
    rootValue: {
        getUser: userController.getUser,
        getAll: productController.getProduct,
        getProduct: productController.getProduct,
        deleteProduct: productController.deleteProduct,
        getCart: cartController.getCart,
        newProduct: productController.newProduct,
        updateProduct: productController.updateProduct,
        add: cartController.add,
        buy: cartController.buy,
    },
    graphiql: true
})

router.use('/graphql', graphMiddleware);

export default router;