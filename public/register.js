const baseURL = window.location.origin;
const register = async () => {
    try {
        const user = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            name: document.getElementById("name").value,
            direction: document.getElementById("direction").value,
            age: document.getElementById("age").value,
            phone: document.getElementById("phone").value,
            image: document.getElementById("img").value
        }
        const call = await axios.post(`${baseURL}/api/users/register`, {...user})
        // if (call.data.active)
        //     window.location.href = `/login.html`
        // else
        //     window.location.reload()
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
        const call = await axios.get(`${baseURL}/api/users/loggedin`)
        if (call.data.active)
            window.location.href = `/index.html`
    }
    catch (err) {
        console.log(err)
    }

    return false;
}
$("#target").on("click", () => register());
await loggedin();