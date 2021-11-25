const setQuery = (q: string) => {
    return {
        type: 'SEARCH',
        q: q
    }
}

export default setQuery;