import axios from "axios"
const countriesUrl = "https://restcountries.com/v3.1/all"
const apiUrl = "https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current"
const api_key = process.env.REACT_APP_API_KEY

const getAll = () => {
    const request = axios.get(countriesUrl)
    return request.then(response => response.data)
}

const getWeatherData = (name) => {
    const request = axios.get(`${apiUrl}?access_key=${api_key}&query=${name}`)
    return request.then(response => response.data)
}

const exportedObject = { getAll, getWeatherData }

export default exportedObject