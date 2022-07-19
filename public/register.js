const register = async () => {
    try {
        const name = document.getElementById("username").value;
        const pass = document.getElementById("pasword").value
        const call = await axios.post('http://localhost:8080/api/users/register', { name: name, password: pass })
        if (call.data.active)
            window.location.href = `/index.html?name=${call.data.name}`
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
        const call = await axios.get('http://localhost:8080/api/users/loggedin')
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