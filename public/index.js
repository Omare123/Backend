const baseURL = window.location.origin;
let user = null;

const getAllProducts = async () => {
    const allProducts = (await axios.get(`${baseURL}/api/products`)).data;
    let ids = [];
    let template = await fetch('/addProducts.hbs').then(response => response.text());
    const tmplt = Handlebars.compile(template)
    const html = allProducts.map((product) => {
        product.image = "https://coder-house-omar.herokuapp.com/uploads/" + product.image;
        ids = [...ids, product._id];
        return tmplt(product);
    }).join(' ')
    document.getElementById('renderElement').innerHTML = html;
    ids.forEach(id => document.getElementById(`${id}`).addEventListener("click", () => addToCart(id)))
}
const addToCart = async (id) => {
    const cart =  await axios.post(`${baseURL}/api/cart/add`, {product: id});
    console.log(cart)
}

const removeToCart = (id) => {

}
const loggedin = async () => {
    try {
        const call = await axios.get(`${baseURL}/api/users/loggedin`)
        if (call.data.active) {
            const user = (await axios.get(`${baseURL}/api/users?username=${call.data.name}`)).data
            fetch('/header.hbs').then(response => response.text()).then(template => {
                const tmplt = Handlebars.compile(template)
                const html = tmplt({ name: user.name })
                document.getElementById('welcome').innerHTML = html;
            })
            document.getElementById("profilePic").innerHTML = `<img src="${"https://coder-house-omar.herokuapp.com/uploads/" + user.photo}" class="rounded-circle ml-1" alt="profile" width="30" height="30">`
        }
        else {
            window.location.href = "/login.html"
        }
    }
    catch (error) {
        console.log(error)
    }

    return false;
}

const logout = async () => {
    await axios.get(`${baseURL}/api/users/logout`)
    window.location.href = "/login.html"
}
$('#logout').on("click", () => logout())
$('#products').on("click", () => window.location.href = "/products.html")
await loggedin();
await getAllProducts();