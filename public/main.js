// const socket = io();
const baseURL = window.location.origin;
let user = null;

const getAllProducts = async () => {
    const allProducts = (await axios.get(`${baseURL}/api/products`)).data
    console.log(allProducts)
    fetch('/addProducts.hbs').then(response => response.text()).then(template =>
        {
            const tmplt = Handlebars.compile(template)
            const html = allProducts.map((product) =>{
                return tmplt(product)
            }).join(' ')
            document.getElementById('renderElement').innerHTML = html;
        })
}

const loggedin = async () => {
    try{
        const call = await axios.get(`${baseURL}/api/users/loggedin`)
        if(call.data.active){
            user = sessionStorage.getItem("name");
            if(user){
                fetch('/header.hbs').then(response => response.text()).then(template =>
                    {
                        const tmplt = Handlebars.compile(template)
                        const html = tmplt({name: call.data.name})
                        document.getElementById('welcome').innerHTML = html;
                    })
            }
        } 
        else  
            window.location.href = "/login.html"
    }
    catch(error){
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