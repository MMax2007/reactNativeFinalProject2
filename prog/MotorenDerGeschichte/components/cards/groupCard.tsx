import { Group } from '@/app/types/group'
import React from 'react'
import { router } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import { deleteGroup } from '@/app/api/groupsAPI'

type Props = {
    group: Group
    styles: any
    onDelete: () => void
}

export default function GroupCard({group, styles, onDelete}: Props) {
    async function handleDelete() {
        await deleteGroup(group.id)
        onDelete()
    }

    return (
        <View style={styles.cardBase}>
            <Text style={styles.cardTitle}>
                {group.title}
            </Text>
            <Text style={styles.cardText}>
                {group.id}
            </Text>
            <Text style={styles.cardText}>
                {group.campaign}
            </Text>
            <View style={styles.horizontal}>
                <TouchableOpacity
                    style={styles.btnMini}
                    onPress={
                        () => router.push(`/dev/groupUpdate?id=${group.id}`)
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