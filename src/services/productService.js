import { productDTO } from '../helpers/DTOS.js'

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
        product.active = true;
        const newProduct = productDTO(product)
        return await this.productDao.save(newProduct)
    }
    updateProduct = async (product) => {
        const newProduct = productDTO(product)
        const oldProduct = productDTO(await this.productDao.getByparameter(product._id))
        const updatedProduct = {...oldProduct, name: newProduct.name, price: newProduct.price}
        return await this.productDao.update(updatedProduct)
    }
    deleteProduct = async (id) => {
        return await this.productDao.deleteById(id)
    }
}

export default ProductService;