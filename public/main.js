const socket = io();

fetch('/addProducts.hbs').then(response => response.text()).then(template =>
    {
        const tmplt = Handlebars.compile(template)
        socket.on('products', (products) => {
            
            const html = products.map((product) =>{
                return tmplt(product)
            }).join(' ')
            document.getElementById('renderElement').innerHTML = html;
        })
        socket.on('product', (product) => {
            const html =tmplt(product)
            document.getElementById('renderElement').innerHTML += html;
        })

    })
fetch('/addMessages.hbs').then(response => response.text()).then(template =>
        {
            const tmplt = Handlebars.compile(template)
            socket.on('messages', (messages) => {
                const html = messages.map((message) =>{
                    return tmplt(message)
                }).join(' ')
                document.getElementById('messages').innerHTML = html;
            })
            socket.on('message', (message) => {
                const html = tmplt(message)
                document.getElementById('messages').innerHTML += html;
            })
        })

const sendMessage = async () => {
    const author = {"id": 1, "name": document.getElementById("author").value};
    const text = {"id": 1, "comment": document.getElementById("text").value};
    const message = {"post":{"id": 1, "author": author, "text":text}};
    try{
        const call = await axios.post('http://localhost:80/api/chat', message)
        socket.emit('new_message', message);
    }
    catch(err){
        console.log("err", err)
    }
    
    return false;
}

const addProduct = async () => {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    const product = {name, price, image};
    try{
        const call = await axios.post('http://localhost:80/api/productos', {...product})
        socket.emit('new_product', product);
    }
    catch(err){
        console.log(err)
    }

    return false;
}

const loggedin = async () => {
    try{
        const call = await axios.get('http://localhost:80/api/users/loggedin')
        console.log(call)
        if(call.data.active){
            const urlParams = new URLSearchParams(window.location.search);
            const name = urlParams.get('name');
            if(name){
                fetch('/header.hbs').then(response => response.text()).then(template =>
                    {
                        const tmplt = Handlebars.compile(template)
                        const html = tmplt({name: call.data.name})
                        document.getElementById('welcome').innerHTML = html;
                    })
            }
            else
                window.location.href = `/index.html?name=${call.data.name}`
        } 
        else  
            window.location.href = "/login.html"
    }
    catch(err){
        console.log(err)
    }

    return false;
}

const logout = async () => {
    window.location.href = "/logout.html"
}
$('#logout').on("click", () => logout())
await loggedin();
