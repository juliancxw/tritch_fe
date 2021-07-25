import axios from 'axios'
import qs from 'qs'

// create axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1/places",
    timeout: 5000, // 5000ms = 5s
})

const placesAPI = {
    
    search: (location) => {
        return axiosInstance.get(`/${location}`)
    },
    photo: (photoRef) => {
        return axiosInstance.get(`/photo/${photoRef}`)
    },
}

export default placesAPI