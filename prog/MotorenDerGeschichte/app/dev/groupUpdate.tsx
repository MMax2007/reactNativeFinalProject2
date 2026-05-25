import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import { createStyles } from '../styles'
import useTheme from '@/components/themes/loadTheme'
import { router, useLocalSearchParams } from 'expo-router'
import { getGroupByID, updateGroup } from '../api/groupsAPI'

function clean(data: any) {
  return Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v != null && v !== '')
  )
}

export default function groupUpdate() {
  const styles = createStyles(useTheme())

  const { id } = useLocalSearchParams()
  const [title, setTitle] = useState('')
  const [parent_group, setParentGroup] = useState('')
  const [campaign, setCampaign] = useState('')
  const [image, setImage] = useState('')
  
  useEffect(
    () => {
      async function loadGroup() {
        const data = await getGroupByID(id as string)
        setTitle(data.title)
        setParentGroup(data.parent_group || '')
        setCampaign(data.campaign || '')
        setImage(data.image || '')
        console.log(`input: ${data}`)
      }
      loadGroup()
    }, []
  )

  async function handleUpdate() {
    await updateGroup(
      id as string,
      clean({
        title,
        parent_group,
        image
      })
    )
    alert('Группа обновлена')
    router.back()
  }

  return (
    <View style={styles.backgroundRect}>
      <View style={styles.foregroundRect}>
        <View style={styles.subtitleBlock}>
          <Text style={styles.subtitleText}>
            Изменение группы
          </Text>
        </View>

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
          onPress={handleUpdate}
        >
          <Text style={styles.menuBtnText}>
            Обновить
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}