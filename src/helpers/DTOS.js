export const productDTO = (product) => {
    return {
        _id: product._id,
        price: product.price,
        name: product.name,
        image: product.image,
        active: product.active
    }
}

export const messageDTO = ({text, username, id, active}) => {
    return {
        _id: id,
        username: username,
        text: text,
        active: active || true
    }
}

export const userDTO = (user) => {
    return {
        username: user.username,
        name: user.name,
        password: user.password,
        direction: user.direction,
        age: user.age,
        phone: user.phone,
        photo: user.photo,
        active: user.active
    }
}

export const cartDTO = (username, items, active) => {
    return {
        username: username,
        active: active,
        items: [...items]
    }
}
export const  addedProductDTO = (product, count) => {
    return {
        product: {...product},
        count: count
    }
}