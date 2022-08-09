const register = async () => {
    try {
        const name = document.getElementById("username").value;
        const pass = document.getElementById("password").value
        const call = await axios.post('http://localhost:80/api/users/register', { username: name, password: pass })
        if (call.data.active)
            window.location.href = `/login.html`
        else
            window.location.reload()
    }
    catch (err) {
        let error = document.createElement('span');
        const errorMessage = document.createTextNode(err);
        error.appendChild(errorMessage)
        let errorDiv = document.getElementById("error");
        errorDiv.appendChild(error)
    }

    return false;
}

const loggedin = async () => {
    try {
        const call = await axios.get('http://localhost:80/api/users/loggedin')
        if (call.data.active)
            window.location.href = `/index.html?name=${call.data.name}`
    }
    catch (err) {
        console.log(err)
    }

    return false;
}
$( "#target" ).on("click", () => register());
await loggedin();