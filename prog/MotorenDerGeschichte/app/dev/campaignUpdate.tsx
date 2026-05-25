import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import { createStyles } from '../styles'
import useTheme from '@/components/themes/loadTheme'
import { createCampaign, getCampaignByID, updateCampaign } from '../api/campaignsAPI'
import { Alert } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

export default function campaignUpdate() {
  const styles = createStyles(useTheme())

  const { id } = useLocalSearchParams()
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')

	useEffect(
		() => {
			async function loadCampaign() {
				const data = await getCampaignByID(id as string)
				setTitle(data.title)
				setImage(data.image || '')
			}
			loadCampaign()
		}, []
	)

  async function handleUpdate() {
    await updateCampaign(
			id as string,
			{
      	title,
      	image
    	}
		)
    alert('Кампания обновлена')
		router.back()
  }

  return (
    <View style={styles.backgroundRect}>
      <View style={styles.foregroundRect}>
        <View style={styles.subtitleBlock}>
          <Text style={styles.subtitleText}>
            Изменение кампании
          </Text>
        </View>

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