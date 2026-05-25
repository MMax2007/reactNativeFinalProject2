import { View, Text, TouchableOpacity, Switch, TextInput, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { createStyles } from '../styles'
import useTheme from '@/components/themes/loadTheme'
import { router, useLocalSearchParams } from 'expo-router'
import { getGroupByID, updateGroup } from '../api/groupsAPI'
import { getElementByID, updateElement } from '../api/elementsAPI'

function clean(data: any) {
  return Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v != undefined && v !== null)
  )
}

export default function elementUpdate() {
  const styles = createStyles(useTheme())

  const { id } = useLocalSearchParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
	const [code_name, setCodeName] = useState('')
	const [group, setGroup] = useState('')
  const [image, setImage] = useState('')
	const [is_starter, setIsStarter] = useState(false)
  
  useEffect(
    () => {
      async function loadElement() {
        const data = await getElementByID(id as string)
        setTitle(data.title)
        setDescription(data.description || '')
        setCodeName(data.code_name)
        setGroup(data.group.id)
        setImage(data.image || '')
        setIsStarter(Boolean(data.is_starter))
      }
      loadElement()
    }, []
  )

  async function handleUpdate() {
    const finalData = clean({
      title,
      description,
      code_name,
      group,
      image
    })
    finalData.is_starter = is_starter
    console.log(finalData)
    await updateElement(
      id as string,
      finalData
    )
    alert('Элемент обновлён')
    router.back()
  }

  return (
    <ScrollView>
      <View style={styles.backgroundRect}>
        <View style={styles.foregroundRect}>
          <View style={styles.subtitleBlock}>
            <Text style={styles.subtitleText}>
              Изменение элемента
            </Text>
          </View>

          <TextInput
            placeholder='Название'
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
        
          <TextInput
            placeholder='Описание'
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
        
          <TextInput
            placeholder='Кодовое обозначение'
            value={code_name}
            onChangeText={setCodeName}
            style={styles.input}
          />
        
          <TextInput
            placeholder='Группа'
            value={group}
            onChangeText={setGroup}
            style={styles.input}
          />
        
          <TextInput
            placeholder='Название изображения'
            value={image}
            onChangeText={setImage}
            style={styles.input}
          />
        
          <Switch
            value={is_starter}
            onValueChange={setIsStarter}
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
    </ScrollView>
  )
}