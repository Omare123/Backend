const baseURL = window.location.origin;

const loggedin = async () => {
    try {
        const call = await axios.get(`${baseURL}/api/users/loggedin`)
        if (call.data.active) {
            const user = (await axios.get(`${baseURL}/api/users?username=${call.data.name}`)).data
            document.getElementById("profilePic").innerHTML = `<img src="${baseURL + "/uploads/" + user.photo}" class="rounded-circle ml-1" alt="profile" width="30" height="30">`
            let template = await fetch('/profile.hbs').then(response => response.text());
            const tmplt = Handlebars.compile(template);
            user.photo = baseURL + "/uploads/" + user.photo;
            const html = tmplt(user);
            document.getElementById('renderElement').innerHTML = html;
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


const logout = async () => {
    await axios.get(`${baseURL}/api/users/logout`)
    window.location.href = "/login.html"
}
$('#logout').on("click", () => logout())
await loggedin();