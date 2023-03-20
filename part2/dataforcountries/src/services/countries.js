import axios from "axios"
const countriesUrl = "https://restcountries.com/v3.1/all"

const getAll = () => {
    const request = axios.get(countriesUrl)
    return request.then(response => response.data)
}

const exportedObject = { getAll }

export default exportedObject