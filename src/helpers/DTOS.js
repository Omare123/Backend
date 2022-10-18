export const productDTO = (product) => {
    return {
        id: product._id,
        price: product.price,
        name: product.name
    }
}

export const userDTO = (user) => {
    return {
        username: user.username,
        name: user.name,
        passwod: passwod,
        direction: user.direction,
        age: user.age,
        phone: user.phone,
        photo: user.photo
    }
}

export const cartDTO = (username, items) => {
    return {
        username: username,
        items: [...items]
    }
}
export const  addedProductDTO = (product, count) => {
    return {
        product: product,
        count: count
    }
}