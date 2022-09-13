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
        direction: user.direction,
        age: user.age,
        phone: user.phone,
        photo: user.photo
    }
}

export const cartDTO = (cart) => {
    return {
        username: cart.username,
        items: [...cart.items]
    }
}