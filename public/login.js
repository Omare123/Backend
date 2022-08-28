const baseURL = window.location.origin;
const login = async () => {
    try {
        const name = document.getElementById("username").value;
        const pass = document.getElementById("password").value
        let call = await axios.post(`${baseURL}/api/users/login`, { username: name, password: pass })
        if (call.data.active){
            window.location.href = `/index.html`
            sessionStorage.setItem("name", name)
        }
    }
    catch (err) {
        console.log(err)
        let error = `<span>${err.response.data}</span>`
        let errorDiv = document.getElementById("error");
        errorDiv.innerHTML = error;
    }

    return false;
}

const loggedin = async () => {
    try {
        const call = await axios.get(`${baseURL}/api/users/loggedin`)
        if (call.data.active)
            window.location.href = `/index.html?name=${call.data.name}`
    }
    catch (err) {
        console.log(err)
    }

    return false;
}
$("#target").on("click", () => login());
await loggedin();