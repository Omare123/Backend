
export default class ProductController {
  constructor(productService){
    this.productService = productService;
  }
  getProduct = async (id) => {
    if(id)
      return await this.productService.getProduct(id)
    
    return await this.productService.getAll()
  }
  newProduct = async (product, filename) => {
    product.image = filename;
    return await this.productService.newProduct(product)
  }

  updateProduct = async (product) => {
    return await this.productService.updateProduct(product)
  }
  deleteProduct = async (id) => {
    return await this.productService.deleteProduct(id)
  }
}