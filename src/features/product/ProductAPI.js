export function fetchAllProducts() {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/products')
        const data = await response.json()
        resolve({ data })

    });
}
export function fetchProductsByFilter(filter, sort) {
    //filter = {"category": "smarphone"}
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

    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/products?' + queryString)
        const data = await response.json()
        resolve({ data })

    })
}