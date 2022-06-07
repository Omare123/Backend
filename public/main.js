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
    })
fetch('/addMessages.hbs').then(response => response.text()).then(template =>
        {
            const tmplt = Handlebars.compile(template)
            socket.on('messages', messages => {
                const html = messages.map((message) =>{
                    return tmplt(message)
                }).join(' ')
                document.getElementById('messages').innerHTML = html;
            })
        })

const sendMessage = () => {
    const author = document.getElementById("author").value;
    const text = document.getElementById("text").value;
    const message = {author, text};
    socket.emit('new_message', message);
    return false;
}

const addProduct = () => {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    const product = {name, price, image};
    socket.emit('new_product', product);
    return false;
}

