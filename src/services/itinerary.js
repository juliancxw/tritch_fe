import axios from 'axios'
import qs from 'qs'

// create axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1/itineraries",
    timeout: 5000, // 5000ms = 5s
})

const itineraryAPI = {
    // listAll: (page, per_page, season, trip_duration, destination) => {
    //     return axiosInstance.get('/', qs.stringify({
    //         email: email,
    //         password: password,
    //     }))
    // },
    getItinerary: (id) => {
        return axiosInstance.get(`/view/${id}`)
    },
    createItinerary: (destination, userId) => {
        console.log("contacting itinerary api")
        return axiosInstance.post(`/`, qs.stringify({
            destination: destination,
            creator: userId

        }))
        
    },
    updateItinerary: (id, name, destination, trip_duration, itinerary, published) => {
        return axiosInstance.patch(`/${id}`, qs.stringify({
            name : name,
            destination: destination,
            trip_duration: trip_duration,
            itinerary: itinerary,
            published: published

        }))
    },
    deleteItinerary: (id) => {
        return axiosInstance.delete(`/${id}`)
    },
    // getProductBySlug: (slug) => {
    //     return axiosInstance.get(`/products/${slug}`)
    // },
    // sendContactForm: (name, email, message) => {
    //     return axiosInstance.post('/send-contact-form', qs.stringify({
    //         name: name,
    //         email: email,
    //         message: message
    //     }))
    // }
}

export default itineraryAPI