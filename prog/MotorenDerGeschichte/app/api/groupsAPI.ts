import axios from 'axios'
import { baseURL } from '@/constants/network'
import { Group } from '../types/group'

export async function getAllGroups() {
    const response = await axios.get<Group[]>(
        `${baseURL}/groups/all/`
    )
    return response.data
}

export async function getGroupByID(id: string) {
    const response = await axios.get<Group>(
        `${baseURL}/group/${id}/`
    )
    return response.data
}

export async function getCampaignByGroup(id: string) {
    const response = await axios.get(
        `${baseURL}/campaign/by_group/${id}/`
    )
    return response.data
}

export async function getElementsByGroup(id: string) {
    const response = await axios.get(
        `${baseURL}/elements/by_group/${id}/`
    )
    return response.data
}

export async function getChildGroupsByGroup(id: string) {
    const response = await axios.get<Group[]>(
        `${baseURL}/child_groups/by_group/${id}/`
    )
    return response.data
}

export async function getParentGroupByGroup(id: string) {
    const response = await axios.get<Group>(
        `${baseURL}/parent_group/by_group/${id}/`
    )
    return response.data
}

export async function getItemsByGroup(id: string) {
    const response = await axios.get(
        `${baseURL}/all/by_group/${id}/`
    )
    return response.data
}

export async function createGroup(data: {
    id: string,
    title: string,
    parent_group?: string,
    campaign: string,
    image?: string
}) {
    const response = await axios.post(
        `${baseURL}/group/`,
        data
    )
    return response.data
}

export async function updateGroup(id: string, data: {
    title?: string,
    parent_group?: string | null,
    image?: string | null
}) {
    const response = await axios.patch(
        `${baseURL}/group/${id}/`,
        data
    )
    return response.data
}

export async function deleteGroup(id: string) {
    const response = await axios.delete(
        `${baseURL}/group/${id}/`
    )
    return response.data
}