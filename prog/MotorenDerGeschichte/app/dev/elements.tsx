import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { router } from 'expo-router'
import useTheme from '@/components/themes/loadTheme'
import { createStyles } from '../styles'
import { useEffect, useState } from 'react'
import { getAllElements } from '../api/elementsAPI'
import { Element } from '../types/element'
import ElementCard from '@/components/cards/elementCard'

export default function devPanelElements() {
  let styles = createStyles(useTheme())
  const [elements, setElements] = useState<Element[]>([])

  async function loadElements() {
    const data = await getAllElements()
    setElements(data)
  }

  useEffect(
    () => {
      loadElements()
    }, []
  )

  return (
    <View style={styles.backgroundRect}>
      <View style={styles.foregroundRect}>
        <View style={styles.subtitleBlock}>
          <Text style={styles.subtitleText}>
            Элементы
          </Text>
        </View>

        <TouchableOpacity
            style={styles.interfaceBtn}
            onPress={() => router.push('/dev/elementCreate')}
          >
            <Text style={styles.menuBtnText}>
              Создать новый элемент
            </Text>
          </TouchableOpacity>

        <FlatList
          data={elements}
          keyExtractor={(item) => item.id}
          renderItem={
            ({item}) => (
              <ElementCard
                elem={item}
                styles={styles}
                onDelete={loadElements}
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