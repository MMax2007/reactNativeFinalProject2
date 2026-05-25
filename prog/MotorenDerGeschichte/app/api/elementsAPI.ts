import axios from 'axios'
import { baseURL } from '@/constants/network'

export async function getAllElements() {
    const response = await axios.get(
        `${baseURL}/elements/all/`
    )
    return response.data
}

export async function getElementByID(id: string) {
    const response = await axios.get(
        `${baseURL}/element/${id}/`
    )
    return response.data
}

export async function getCampaignByElement(id: string) {
    const response = await axios.get(
        `${baseURL}/campaign/by_element/${id}/`
    )
    return response.data
}

export async function getGroupByElement(id: string) {
    const response = await axios.get(
        `${baseURL}/group/by_element/${id}/`
    )
    return response.data
}

export async function getReactionsByElement(id: string) {
    const response = await axios.get(
        `${baseURL}/reactions/by_element/${id}/`
    )
    return response.data
}

export async function getRecipesByElement(id: string) {
    const response = await axios.get(
        `${baseURL}/recipes/by_element/${id}/`
    )
    return response.data
}

export async function createElement(data: {
    id: string,
    title: string,
    description?: string,
    code_name: string,
    group: string,
    image?: string,
    is_starter: boolean
}) {
    const response = await axios.post(
        `${baseURL}/element/`,
        data
    )
    return response.data
}

export async function updateElement(id: string, data: {
    title?: string,
    description?: string,
    code_name?: string,
    group?: string,
    image?: string,
    is_starter?: boolean
}) {
    const response = await axios.patch(
        `${baseURL}/element/${id}/`,
        data
    )
    return response.data
}

export async function deleteElement(id: string) {
    const response = await axios.delete(
        `${baseURL}/element/${id}/`
    )
    return response.data
}