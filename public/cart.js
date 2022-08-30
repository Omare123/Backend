const baseURL = window.location.origin;
let user = null;

const getAllProducts = async () => {

    const cart = (await axios.get(`${baseURL}/api/cart/`)).data;
    if (cart) {
        let ids = [];
        let template = await fetch('/cartProduct.hbs').then(response => response.text());
        const tmplt = Handlebars.compile(template)
        const html = cart.items.map((item) => {
            item.product.image = baseURL + "/uploads/" + item.product.image;
            ids = [...ids, item.product._id];
            return tmplt(item);
        }).join(' ')
        document.getElementById('renderElement').innerHTML = html;
    }
    else {
        document.getElementById('buyButton').innerHTML = ""
        document.getElementById('renderElement').innerHTML = "<h3>No hay nada en el carrito</h3>"
    }
}

const loggedin = async () => {
    try {
        const call = await axios.get(`${baseURL}/api/users/loggedin`)
        if (call.data.active) {
            const user = (await axios.get(`${baseURL}/api/users?username=${call.data.name}`)).data
            document.getElementById("profilePic").innerHTML = `<img src="${baseURL + "/uploads/" + user.photo}" class="rounded-circle ml-1" alt="profile" width="30" height="30">`
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
const buy = async () => {
    const done = await axios.get(`${baseURL}/api/cart/buy`)
    if (done.status === 200) {
        alert("Compra con exito")
        window.location.href = "/index.html"
    }
    else
        console.log(done)

}

const logout = async () => {
    await axios.get(`${baseURL}/api/users/logout`)
    window.location.href = "/login.html"
}
$('#logout').on("click", () => logout())
$('#buy').on("click", () => buy())
await loggedin();
await getAllProducts();