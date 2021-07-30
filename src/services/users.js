import axios from 'axios'

// create axios instance
const axiosInstance = axios.create({
    baseURL: "https://tritch-be.herokuapp.com/api/v1/users/show/",
    timeout: 5000, // 5000ms = 5s
})

const usersAPI = {
    
    getUser: (verifiedUserId) => {
        return axiosInstance.get(`${verifiedUserId}`)
    },
}

export default usersAPI

