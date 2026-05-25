import axios from 'axios'
import { baseURL } from '@/constants/network'

export async function getAllCampaigns() {
    const response = await axios.get(
        `${baseURL}/campaigns/all/`
    )
    return response.data
}

export async function getCampaignByID(id: string) {
    const response = await axios.get(
        `${baseURL}/campaign/${id}/`
    )
    return response.data
}

export async function getGroupsByCampaign(id: string) {
    const response = await axios.get(
        `${baseURL}/groups/by_campaign/${id}/`
    )
    return response.data
}

export async function getElementsByCampaign(id: string) {
    const response = await axios.get(
        `${baseURL}/elements/by_campaign/${id}/`
    )
    return response.data
}

export async function getReactionsByCampaign(id: string) {
    const response = await axios.get(
        `${baseURL}/reactions/by_campaign/${id}/`
    )
    return response.data
}

export async function createCampaign(data: {
    id: string,
    title: string,
    image?: string
}) {
    const response = await axios.post(
        `${baseURL}/campaign/`,
        data
    )
    return response.data
}

export async function updateCampaign(id: string, data: {
    title?: string,
    image?: string | null
}) {
    const response = await axios.patch(
        `${baseURL}/campaign/${id}/`,
        data
    )
    return response.data
}

export async function deleteCampaign(id: string) {
    const response = await axios.delete(
        `${baseURL}/campaign/${id}/`
    )
    return response.data
}