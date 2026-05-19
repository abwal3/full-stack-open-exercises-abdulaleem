import axios from "axios"
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/all"
    

const getAll = () => {
    return axios.get(baseURL)
        .then(response => {
            console.log(response.data)
            
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
}

export default {
    getAll


};