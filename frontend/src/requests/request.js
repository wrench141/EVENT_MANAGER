import axios from "axios";
import {SERVER_API} from "../keys.js" 

const getRequest = async(query) => {
    const token = window.localStorage.getItem("token")
    const response = await axios.get(SERVER_API + query, {
        headers:{
            token: token
        }
    }).catch((err) => {
        return err?.response
    });
    
    return response?.data
}
const postRequest = async(query, data) => {
    const token = window.localStorage.getItem("token")
    const response = await axios.post(SERVER_API + query, data, {
        headers:{
            token: token
        }
    }).catch((err) => {
        return err?.response
    });

    return response?.data
}

const patchRequest = async(query, data) => {
    const token = window.localStorage.getItem("token")
    const response = await axios.patch(SERVER_API + query, data, {
        headers:{
            token: token
        }
    }).catch((err) => {
        return err?.response
    });

    return response?.data
}

const delRequest = async(query) => {
    const token = window.localStorage.getItem("token")
    const response = await axios.delete(SERVER_API + query, {
        headers:{
            token: token
        }
    }).catch((err) => {
        return err?.response
    });

    return response?.data
}


export {getRequest, postRequest, patchRequest, delRequest}