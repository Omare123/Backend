const baseURL = window.location.origin;
const socket = io();

const sendMessage = async () => {
    if (document.getElementById("message").value === '')
        return false
    let message = {
        text: document.getElementById("message").value,
        username: sessionStorage.getItem("name")
    }
    socket.emit('new_message', message);
    document.getElementById("message").value = '';
    return false;
}
const response = await fetch('/addMessages.hbs');
const template = await response.text();
const tmplt = Handlebars.compile(template);
    socket.on("connect", () => {
        socket.emit('new_message', {
            text: `${sessionStorage.getItem("name")} se ha conectado`,
            username: ''
        });
    });
    socket.on('message', message => {
        const html = tmplt(message);
        document.getElementById('messages').innerHTML += html;
    })
    socket.on('messages', messages => {
        const html = messages.map((message) => {
            return tmplt(message)
        }).join(' ')
        document.getElementById('messages').innerHTML = html;
    })
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

const logout = async () => {
    sessionStorage.clear();
    await axios.get(`${baseURL}/api/users/logout`)
    window.location.href = "/login.html"
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
await loggedin();
$('#logout').on("click", () => logout())
$("#target").on("click", () => sendMessage());