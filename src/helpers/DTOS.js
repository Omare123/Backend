export const productDTO = (product) => {
    return {
        price: product.price,
        name: product.name,
        image: product.image
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