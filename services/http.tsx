import axios from "axios"

const PostRequest = async (url: any, payload: any) => {
  axios
    .post(`http://localhost:3001/v1/api/${url}`, payload)
    .then(function (response) {
      console.log("response", response)
      if (response?.status === 201) {
        return response?.data
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

const GetRequest = async (url: any, payload: any) => {
  axios
    .get(`http://localhost:3001/v1/api/${url}`, payload)
    .then(function (response) {
      console.log("response", response)
      if (response?.status === 200) {
        return response?.data
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}
