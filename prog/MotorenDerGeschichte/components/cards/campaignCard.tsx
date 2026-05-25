import { Campaign } from '@/app/types/campaign'
import React from 'react'
import { router } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import { deleteCampaign } from '@/app/api/campaignsAPI'

type Props = {
    camp: Campaign
    styles: any
    onDelete: () => void
}

export default function CampaignCard({camp, styles, onDelete}: Props) {
    async function handleDelete() {
        await deleteCampaign(camp.id)
        onDelete()
    }

    return (
        <View style={styles.cardBase}>
            <Text style={styles.cardTitle}>
                {camp.title}
            </Text>
            <Text style={styles.cardText}>
                {camp.id}
            </Text>
            <View style={styles.horizontal}>
                <TouchableOpacity
                    style={styles.btnMini}
                    onPress={
                        () => router.push(`/dev/campaignUpdate?id=${camp.id}`)
                    }
                >
                    <Text style={styles.btnMiniText}>
                        Редактировать
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnMini}
                    onPress={handleDelete}
                >
                    <Text style={styles.btnMiniText}>
                        Удалить
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}