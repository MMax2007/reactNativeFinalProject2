import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { router } from 'expo-router'
import useTheme from '@/components/themes/loadTheme'
import { createStyles } from '../styles'
import { useEffect, useState } from 'react'
import ReactionCard from '@/components/cards/reactionCard'
import { getAllReactions } from '../api/reactionsAPI'
import { Reaction } from '../types/reaction'

export default function devPanelReactions() {
  let styles = createStyles(useTheme())
  const [reactions, setReaction] = useState<Reaction[]>([])

  async function loadReaction() {
    const data = await getAllReactions()
    setReaction(data)
  }

  useEffect(
    () => {
      loadReaction()
    }, []
  )

  return (
    <View style={styles.backgroundRect}>
      <View style={styles.foregroundRect}>
        <View style={styles.subtitleBlock}>
          <Text style={styles.subtitleText}>
            Реакции
          </Text>
        </View>

        <TouchableOpacity
            style={styles.interfaceBtn}
            onPress={() => router.push('/dev/reactionCreate')}
          >
            <Text style={styles.menuBtnText}>
              Создать новую реакцию
            </Text>
          </TouchableOpacity>

        <FlatList
          data={reactions}
          renderItem={
            ({item}) => (
              <ReactionCard
                reaction={item}
                styles={styles}
                onDelete={loadReaction}
              />
            )
          }
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 25,
            justifyContent: 'center'
          }}
        />
      </View>
    </View>
  )
}