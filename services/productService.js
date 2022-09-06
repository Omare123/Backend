import ProductDao from '../src/daos/ProductDaoMongodb.js'

const productDao = new ProductDao();

class ProductService {
    constructor() {
    }

    getAll = async () => {
        return await productDao.getAll();
    }

    getProduct = async (id) => {
        return await productDao.getByparameter(id)
    }

    newProduct = async (product) => {
        return await productDao.save(product)
    }
    updateProduct = async (product) => {
        return await productDao.update(product)
    }
    deleteProduct = async (id) => {
        return await productDao.deleteById(id)
    }
}

export default ProductService;