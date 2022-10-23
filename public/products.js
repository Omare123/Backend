const baseURL = window.location.origin;
const addProduct = async () => {
    try {
        let formData = new FormData();
        formData.append("name",document.getElementById("name").value)
        formData.append("price",document.getElementById("price").value)
        formData.append("uploaded_file", document.getElementById("file").files[0])
        const call = await axios.post(`${baseURL}/api/products/`, formData)
        if(call.status === 200)
            location.reload();
    }
    catch (err) {
        console.log(err)
        let error = document.createElement('span');
        const errorMessage = document.createTextNode(err);
        error.appendChild(errorMessage)
        let errorDiv = document.getElementById("error");
        errorDiv.appendChild(error)
    }

    return false;
}
const getAllProducts = async () => {
    const allProducts = (await axios.get(`${baseURL}/api/products`)).data;
    if(!allProducts.length)
        document.getElementById('renderElement').innerHTML = '<h2>No hay productos</h2>'
    else{
        let ids = [];
        let template = await fetch('/EditProducts.hbs').then(response => response.text());
        const tmplt = Handlebars.compile(template)
        const html = allProducts.map((product) => {
            product.image = "https://coder-house-omar.herokuapp.com/uploads/" + product.image;
            return tmplt(product);
        }).join(' ')
        document.getElementById('renderElement').innerHTML = html;
        console.log(allProducts);
        allProducts.forEach(product => {
            console.log(product)
            document.getElementById(`delete${product._id}`).addEventListener("click", () => deleteProduct(product._id))
            document.getElementById(`edit${product._id}`).addEventListener("click", () => enableEditProduct(product))
        })
    }
}

const enableEditProduct = async (product) => {
    let template = await fetch('/EditProduct.hbs').then(response => response.text());
    const tmplt = Handlebars.compile(template)
    const html = tmplt(product)
    document.getElementById('editForm').innerHTML = html;
    $("#edit").on("click", () => editProduct(product._id));
}
const editProduct = async (id) => {
    let editedProduct  = {
        _id: id, 
        name: document.getElementById("editName").value,
        price: document.getElementById("editPrice").value
    }
    const response =  await axios({
        method: 'patch',
        url: `${baseURL}/api/products/${id}`,
        data: editedProduct
    })
    console.log(response.data);
    if(response.status === 200){
        alert("Producto editado")
        location.reload();
    }
    else
        alert("hubo un problema")
}
const deleteProduct = async (id) => {
    const response =  await axios.delete(`${baseURL}/api/products/${id}`);
    if(response.status === 200){
        alert("Producto eliminado")
        location.reload();
    }
    else
        alert("hubo un problema")
}

$("#target").on("click", () => addProduct());
await getAllProducts();