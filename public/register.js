const baseURL = window.location.origin;
const register = async () => {
    try {
        let formData = new FormData();
        formData.append("username",document.getElementById("username").value)
        formData.append("password",document.getElementById("password").value)
        formData.append("name", document.getElementById("name").value)
        formData.append("direction", document.getElementById("direction").value)
        formData.append("age", document.getElementById("age").value)
        formData.append("phone", document.getElementById("phone").value)
        formData.append("uploaded_file", document.getElementById("file").files[0])
        const call = await axios.post(`${baseURL}/api/users/register`, formData)
        if (call.data.active)
            window.location.href = `/login.html`
        else
            window.location.reload()
    }
    catch (err) {
        console.log(err)
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