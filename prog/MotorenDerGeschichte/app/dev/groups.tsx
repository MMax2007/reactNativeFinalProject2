import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { router } from 'expo-router'
import useTheme from '@/components/themes/loadTheme'
import { createStyles } from '../styles'
import { useEffect, useState } from 'react'
import { getAllGroups } from '../api/groupsAPI'
import GroupCard from '@/components/cards/groupCard'
import { Group } from '../types/group'

export default function devPanelGroups() {
  let styles = createStyles(useTheme())
  const [groups, setGroups] = useState<Group[]>([])

  async function loadGroups() {
    const data = await getAllGroups()
    setGroups(data)
  }

  useEffect(
    () => {
      loadGroups()
    }, []
  )

  return (
    <View style={styles.backgroundRect}>
      <View style={styles.foregroundRect}>
        <View style={styles.subtitleBlock}>
          <Text style={styles.subtitleText}>
            Группы
          </Text>
        </View>

        <TouchableOpacity
            style={styles.interfaceBtn}
            onPress={() => router.push('/dev/groupCreate')}
          >
            <Text style={styles.menuBtnText}>
              Создать новую группу
            </Text>
          </TouchableOpacity>

        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={
            ({item}) => (
              <GroupCard
                group={item}
                styles={styles}
                onDelete={loadGroups}
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