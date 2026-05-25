import AsyncStorage from '@react-native-async-storage/async-storage'
import { getElementsByCampaign } from '../api/campaignsAPI'

export async function createCampaignSave(campaignID: string) {
    const elements = await getElementsByCampaign(campaignID)
    let save: {[key: string]: boolean} = {}
    for (const element of elements) {
        save[element.id] = element.is_starter
    }

    await AsyncStorage.setItem(
        `campaign_${campaignID}`,
        JSON.stringify(save)
    )
}

export async function getCampaignSave(campaignID: string) {
    const campaign = await AsyncStorage.getItem(
        `campaign_${campaignID}`
    )
    if (!campaign) return null
    return JSON.parse(campaign)
}

export async function unlockElement(
    campaignID: string,
    elementID: string
) {
    const save = await getCampaignSave(campaignID)
    if (!save) return
    save[elementID] = true
    await AsyncStorage.setItem(
        `campaign_${campaignID}`,
        JSON.stringify(save)
    )
}

export async function getOpenedGroups(campaignID: string) {
    const elements = await getElementsByCampaign(campaignID)
    const save = await getCampaignSave(campaignID)
    if (!save) return []
    let groups: string[] = []
    for (const element of elements) {
        if (save[element.id]) {
            groups.push(element.group)
        }
    }
    return [...new Set(groups)]
}

export async function isElementUnlocked(
    campaignID: string,
    elementID: string
) {
    const save = await getCampaignSave(campaignID)
    if (!save) return false
    return save[elementID] || false
}