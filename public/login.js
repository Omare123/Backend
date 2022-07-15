const login = async () => {
    try {
        const name = document.getElementById("username").value;
        const call = await axios.post('http://localhost:8080/api/users/login', { name: name })
        if (call.data.active)
            window.location.href = `/index.html?name=${call.data.name}`
        else
            window.location.reload()
    }
    catch (err) {
        console.log(err)
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
$( "#target" ).on("click", () => login());
await loggedin();