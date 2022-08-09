const logout = async () => {
    try{
        const call = await axios.get('http://localhost:80/api/users/logout')
        const response = await fetch('./logout.hbs');
        const template = await response.text();
        const tmplt = Handlebars.compile(template)
        const html = tmplt(call.data)
        document.getElementById('body').innerHTML = html;
    }
    catch(err){
        console.log(err)
    }
}
await logout();