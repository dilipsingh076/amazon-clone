import axios from "axios"

const instance = axios.create({
    baseURL : 'http://localhost:5001/e-clone-7f6a3/us-central1/api' // the api (clud function ) url
});

export default instance