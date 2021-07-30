import axios from 'axios'
import qs from 'qs'

// create axios instance
const axiosInstance = axios.create({
    baseURL: "https://tritch-be.herokuapp.com/api/v1/bucketlist",
    timeout: 5000, // 5000ms = 5s
})

const bucketlistAPI = {
    
    get: (userId) => {
        return axiosInstance.get(`${userId}/view`)
    },
    getOne: (userId, itineraryId) => {
        return axiosInstance.get(`/get/${userId}/${itineraryId}`)
    },
    add: (userId, itineraryId, beenThere, headers) => {
        return axiosInstance.post(`/add`),qs.stringify({
            been_there: beenThere,
            user: userId,
            itineraries: itineraryId

        },qs.stringify(headers))
    },
    delete: (userId) => {
        return axiosInstance.delete(`/remove`)
    },
    patch: (userId) => {
        return axiosInstance.patch(`/update`)
    },

}

export default bucketlistAPI

