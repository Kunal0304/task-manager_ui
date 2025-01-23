import axios from "axios"


const addAdmin = async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/auth/signup`, data)
    return response
}

const signIn = async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/auth/signin`, data)
    return response
}

const postUser = async (data, headers) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/users`, data, { headers })
    return response
}

const getAllUser = async (headers) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/users`, { headers })
    return response
}

const deleteUser = async (id, headers) => {
    const response = await axios.delete(`${process.env.REACT_APP_URL}/users/${id}`, { headers })
    return response
}

const getUser = async (id, headers) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/users/${id}`, { headers })
    return response
}

const updateUser = async (id, data, headers) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/users/${id}`, data, { headers })
    return response
}

const postTask  = async(data, headers) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/tasks`, data, { headers })
    return response
}
const getTask  = async( headers) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/tasks`, { headers })
    return response
}
const updateTask  = async (id, data, headers) =>{  
    const response = await axios.put(`${process.env.REACT_APP_URL}/tasks/${id}`,data, { headers })
    return response

}
const getTaskById  = async (id, headers) =>{  
    const response = await axios.get(`${process.env.REACT_APP_URL}/tasks/${id}`, { headers })
    return response

}

const deleteTaskAPI  = async (id, headers) =>{  
    const response = await axios.delete(`${process.env.REACT_APP_URL}/tasks/${id}`, { headers })
    return response

}

export { addAdmin, signIn, postUser, getAllUser, deleteUser, getUser, updateUser , postTask, getTask, updateTask,getTaskById , deleteTaskAPI}