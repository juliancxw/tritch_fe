import axios from 'axios'
import qs from 'qs'

// create axios instance
const axiosInstance = axios.create({
    baseURL: "https://tritch-be.herokuapp.com/api/v1/users/show/",
    timeout: 5000, // 5000ms = 5s
})

const usersAPI = {
    
    search: (location, latlong) => {
        return axiosInstance.get(`${location}/${latlong}`)
    },
}

export default usersAPI


const getUserData = async () => {
    const verifiedUserID = DecodeToken(Cookies.get("auth_token"));
    await axios
      .get(`https://tritch-be.herokuapp.com/api/v1/show/${verifiedUserID}`, {
        headers: headers,
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        if (!err.response.data) {
          toast(`server error...`);
        }
        toast(err.response.data);
      });
  };