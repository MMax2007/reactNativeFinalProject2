import axios from 'axios'
import { baseURL } from '@/constants/network'

export async function getAllReactions() {
    const response = await axios.get(
        `${baseURL}/reactions/all/`
    )
    return response.data
}

export async function getReactionByID(id: number) {
    const response = await axios.get(
        `${baseURL}/reaction/${id}/`
    )
    return response.data
}

export async function getReactionByReagents(
    reagentA: string,
    reagentB: string
) {
    const response = await axios.get(
        `${baseURL}/reaction/${reagentA}/${reagentB}/`
    )
    return response.data
}

export async function createReaction(data: {
    element_a: string,
    element_b: string,
    results: string[]
}) {
    const response = await axios.post(
        `${baseURL}/reaction/`,
        data
    )
    return response.data
}

export async function updateReaction(id: number, data: {
    element_a?: string,
    element_b?: string,
    results?: string[]
}) {
    const response = await axios.patch(
        `${baseURL}/reaction/${id}/`,
        data
    )
    return response.data
}

export async function deleteReaction(id: number) {
    const response = await axios.delete(
        `${baseURL}/reaction/${id}/`
    )
    return response.data
}