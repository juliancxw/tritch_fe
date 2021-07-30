import axios from 'axios'
import qs from 'qs'

// create axios instance
const axiosInstance = axios.create({
    baseURL: "https://tritch-be.herokuapp.com/api/v1/cities",
    timeout: 5000, // 5000ms = 5s
})

const citiesAPI = {
    
    search: (slug) => {
        return axiosInstance.get(`/${slug}`)
    },

    autoSearch: (query) => {
        console.log('searching')
        return axiosInstance.get(`/search/${query}`)
    },
}

export default citiesAPI