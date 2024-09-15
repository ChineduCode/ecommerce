import axios from "axios";
import { getSession } from "next-auth/react";

export const createUser = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/register`, { userData })
    return response.data
}

export const getUsers = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`)
    return response.data
}

export const getById = async (userId) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/id/:${userId}`)
    return response.data
}

export const updateUser = async (updateData) => {
    const session = await getSession()
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/update`,
        {updateData},
        { headers: {'Authorization': `Bearer ${sessionStorage.accessToken}`}}
    )
    return response.data
}

export const deleteUser = async (userId) => {
    const session = await getSession()
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/delete/:${userId}`, {
        headers: { 'Authorization': `Bearer ${session.accessToken}`}
    })
    return response.data
}
