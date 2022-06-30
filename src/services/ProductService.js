class ProductService {
    constructor(container){
        this.container = container;
    }

    save (object) {
        this.container.save(object)
    }
    // getAll (object) {
    //     this.ProductService.save(object)
    // }
}
export default ProductService;