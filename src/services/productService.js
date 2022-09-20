class ProductService {
    constructor({productDao}) {
        this.productDao = productDao
    }

    getAll = async () => {
        return await this.productDao.getAll();
    }

    getProduct = async (id) => {
        return await this.productDao.getByparameter(id)
    }

    newProduct = async (product) => {
        return await this.productDao.save(product)
    }
    updateProduct = async (product) => {
        return await this.productDao.update(product)
    }
    deleteProduct = async (id) => {
        return await this.productDao.deleteById(id)
    }
}

export default ProductService;