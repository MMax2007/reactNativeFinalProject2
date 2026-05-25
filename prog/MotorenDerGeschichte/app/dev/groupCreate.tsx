import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { useState } from 'react'
import { createStyles } from '../styles'
import useTheme from '@/components/themes/loadTheme'
import { router } from 'expo-router'
import { createGroup } from '../api/groupsAPI'

export default function groupCreate() {
  const styles = createStyles(useTheme())

  const [id, setID] = useState('')
  const [title, setTitle] = useState('')
  const [parent_group, setParentGroup] = useState('')
  const [campaign, setCampaign] = useState('')
  const [image, setImage] = useState('')

  async function handleCreate() {
    await createGroup({
      id,
      title,
      parent_group,
      campaign,
      image
    })
    alert('Группа добавлена')
    router.back()
  }

  return (
    <View style={styles.backgroundRect}>
      <View style={styles.foregroundRect}>
        <View style={styles.subtitleBlock}>
          <Text style={styles.subtitleText}>
            Создание группы
          </Text>
        </View>
    
        <TextInput
          placeholder='ID'
          value={id}
          onChangeText={setID}
          style={styles.input}
        />

        <TextInput
          placeholder='Название'
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <TextInput
          placeholder='Родительская группа'
          value={parent_group}
          onChangeText={setParentGroup}
          style={styles.input}
        />

        <TextInput
          placeholder='Кампания'
          value={campaign}
          onChangeText={setCampaign}
          style={styles.input}
        />

        <TextInput
          placeholder='Название изображения'
          value={image}
          onChangeText={setImage}
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
  )
}