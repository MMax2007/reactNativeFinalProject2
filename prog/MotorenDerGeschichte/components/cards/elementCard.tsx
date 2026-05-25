import React from 'react'
import { router } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import { Element } from '@/app/types/element'
import { deleteElement } from '@/app/api/elementsAPI'

type Props = {
    elem: Element
    styles: any
    onDelete: () => void
}

export default function ElementCard({elem, styles, onDelete}: Props) {
    async function handleDelete() {
        await deleteElement(elem.id)
        onDelete()
    }

    return (
        <View style={styles.cardBase}>
            <Text style={styles.cardTitle}>
                {elem.title}
            </Text>
            <Text style={styles.cardText}>
                {elem.id}
            </Text>
            <Text style={styles.cardText}>
                {elem.group.title} - {elem.campaign.title}
            </Text>
            <View style={styles.horizontal}>
                <TouchableOpacity
                    style={styles.btnMini}
                    onPress={
                        () => router.push(`/dev/elementUpdate?id=${elem.id}`)
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