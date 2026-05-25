import React from 'react'
import { router } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import { Reaction } from '@/app/types/reaction'
import { deleteReaction } from '@/app/api/reactionsAPI'

type Props = {
    reaction: Reaction
    styles: any
    onDelete: () => void
}

export default function ReactionCard({reaction, styles, onDelete}: Props) {
    async function handleDelete() {
        await deleteReaction(reaction.id)
        onDelete()
    }

    return (
        <View style={styles.cardBase}>
            <Text style={styles.cardTitle}>
                {reaction.results.join(',')}
            </Text>
            <Text style={styles.cardText}>
                {reaction.element_a.id} - {reaction.element_b.id}
            </Text>
            <View style={styles.horizontal}>
                <TouchableOpacity
                    style={styles.btnMini}
                    onPress={
                        () => router.push(`/dev/reactionUpdate?id=${reaction.id}`)
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