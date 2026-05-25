import { View, Text, TouchableOpacity, Switch, TextInput, ScrollView } from 'react-native'
import { useState } from 'react'
import { createStyles } from '../styles'
import useTheme from '@/components/themes/loadTheme'
import { router } from 'expo-router'
import { createElement } from '../api/elementsAPI'

export default function elementCreate() {
  const styles = createStyles(useTheme())

  const [id, setID] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
	const [code_name, setCodeName] = useState('')
	const [group, setGroup] = useState('')
  const [image, setImage] = useState('')
	const [is_starter, setIsStarter] = useState(false)

  async function handleCreate() {
    await createElement({
      id,
			title,
			description,
			code_name,
			group,
			image,
			is_starter
    })
    alert('Элемент добавлен')
    router.back()
  }

  return (
		<ScrollView>
    	<View style={styles.backgroundRect}>
    	  <View style={styles.foregroundRect}>
    	    <View style={styles.subtitleBlock}>
    	      <Text style={styles.subtitleText}>
    	        Создание элемента
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