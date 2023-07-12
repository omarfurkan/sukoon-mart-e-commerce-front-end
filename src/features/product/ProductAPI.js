export function fetchAllProducts() {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/products')
        const data = await response.json()
        resolve({ data })

    });
}
export function fetchProductsByFilter(filter, sort, pagination) {
    //filter = {"category": "smarphone, 'laptops"}
    //sort = {_sort:"price",_order="desc"}
    // pagination = http://localhost:8080/products?page=1&_limit=5
    //pagination = {_page:1,_limit=5}

    // ToDo: on server will support multiple values

    let queryString = '';
    for (let key in filter) {
        const categoryValues = filter[key];
        if (categoryValues.length > 0) {
            const lastCategoryValue = categoryValues[categoryValues.length - 1]
            queryString += `${key}=${filter[lastCategoryValue]}&`
        }
    }
    for (let key in sort) {
        queryString += `${key}=${sort[key]}&`
    }
    console.log(pagination)
    for (let key in pagination) {
        queryString += `${key}=${pagination[key]}`
    }

    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/products?' + queryString)
        const data = await response.json()
        const totalItems = await response.headers.get('X-Total-Count')
        resolve({ data: { products: data, totalItems: +totalItems } })

    })
}