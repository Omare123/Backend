const baseURL = window.location.origin;
const addProduct = async () => {
    try {
        let formData = new FormData();
        formData.append("name",document.getElementById("name").value)
        formData.append("price",document.getElementById("price").value)
        formData.append("uploaded_file", document.getElementById("file").files[0])
        const call = await axios.post(`${baseURL}/api/products/`, formData)
        console.log(call)
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

$("#target").on("click", () => addProduct());
