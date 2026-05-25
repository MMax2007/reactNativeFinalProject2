import { View, Text, TouchableOpacity, Switch, TextInput, ScrollView } from 'react-native'
import { useState } from 'react'
import { createStyles } from '../styles'
import useTheme from '@/components/themes/loadTheme'
import { router } from 'expo-router'
import { createReaction } from '../api/reactionsAPI'

export default function reactionCreate() {
  const styles = createStyles(useTheme())

  const [element_a, setElementA] = useState('')
  const [element_b, setElementB] = useState('')
  const [resultsStr, setResultsStr] = useState<string>('')

  async function handleCreate() {
    const results = resultsStr
      .split(',')
      .map(s => s.trim())
    await createReaction({
      element_a,
      element_b,
      results
    })
    alert('Реакция добавлена')
    router.back()
  }

  return (
    <ScrollView>
      <View style={styles.backgroundRect}>
        <View style={styles.foregroundRect}>
          <View style={styles.subtitleBlock}>
            <Text style={styles.subtitleText}>
              Создание реакции
            </Text>
          </View>
    
          <TextInput
            placeholder='ID элемента A'
            value={element_a}
            onChangeText={setElementA}
            style={styles.input}
          />
  
          <TextInput
            placeholder='ID элемента B'
            value={element_b}
            onChangeText={setElementB}
            style={styles.input}
          />
  
          <TextInput
            placeholder='ID получаемых элементов (через ",")'
            value={resultsStr}
            onChangeText={setResultsStr}
            style={styles.input}
          />
  
          <TouchableOpacity
            style={styles.interfaceBtn}
            onPress={handleCreate}
          >
            <Text style={styles.menuBtnText}>
              Создать
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}