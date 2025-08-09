export const getSearchParams = (args) => {
    const values = []
    const searchParams = new URLSearchParams(window.location.search)
    for (const param of args) {
        values.push(searchParams.get(param))
    }
    return values
}

export const setSearchParams = (kwargs) => {
    const url = new URL(location.href)
    const searchParams = url.searchParams
    for (const [key, value] of Object.entries(kwargs)) {
        searchParams.set(key, value)
    }
    history.replaceState(null, '', url.href)
}
