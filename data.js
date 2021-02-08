async function getData() {
    const response = await axios.get('https://corona.lmao.ninja/v2/countries', {
        params: {
            sort: 'todayCases',
            yesterday: true
        }
    })
    return response.data
}

export { getData }