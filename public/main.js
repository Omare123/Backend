const socket = io();

fetch('/addProducts.hbs').then(response => response.text()).then(template =>
    {
        const tmplt = Handlebars.compile(template)
        socket.on('product', (product) => {
            const html = tmplt(product);
            document.getElementById('renderElement').innerHTML = html;
        })
    })
fetch('/addMessages.hbs').then(response => response.text()).then(template =>
        {
            const tmplt = Handlebars.compile(template)
            socket.on('message', message => {
                const html = tmplt(message);
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

const createMessageView = ({author, text}) => {
    return ` 
    <div>
        <strong>${author}</strong>
        <em>${text}</em>
    </div>
    `;
} 

const addMessage = (messages) =>{
    const allMessages = messages.map(message => createMessageView(message)).join(" ");
    document.getElementById('messages').innerHTML = allMessages;
}

socket.on('messages', (messages) => addMessage(messages))