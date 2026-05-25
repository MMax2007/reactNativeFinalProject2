import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { useState } from 'react'
import { createStyles } from '../styles'
import useTheme from '@/components/themes/loadTheme'
import { createCampaign } from '../api/campaignsAPI'
import { Alert } from 'react-native'
import { router } from 'expo-router'

export default function campaignCreate() {
  const styles = createStyles(useTheme())

  const [id, setID] = useState('')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')

  async function handleCreate() {
    await createCampaign({
      id,
      title,
      image
    })
		alert('Кампания добавлена')
    router.back()
  }

  return (
    <View style={styles.backgroundRect}>
      <View style={styles.foregroundRect}>
        <View style={styles.subtitleBlock}>
          <Text style={styles.subtitleText}>
            Создание кампании
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