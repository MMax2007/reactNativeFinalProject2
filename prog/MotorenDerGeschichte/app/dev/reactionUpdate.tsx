import { View, Text, TouchableOpacity, Switch, TextInput, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { createStyles } from '../styles'
import useTheme from '@/components/themes/loadTheme'
import { router, useLocalSearchParams } from 'expo-router'
import { getElementByID, updateElement } from '../api/elementsAPI'
import { getReactionByID, updateReaction } from '../api/reactionsAPI'

export default function reactionUpdate() {
	const styles = createStyles(useTheme())

	const id = Number(useLocalSearchParams().id)
	const [element_a, setElementA] = useState<string>('')
  const [element_b, setElementB] = useState<string>('')
  const [resultsStr, setResultsStr] = useState<string>('')
	
	useEffect(
		() => {
			async function loadReaction() {
				const data = await getReactionByID(id)
				let resultsArr : Number[] = []
				setElementA(data.element_a.id)
				setElementB(data.element_b.id)
				data.results.forEach((i : any) => {
					resultsArr.push(i.id)
				})
				setResultsStr(resultsArr.join(','))
			}
			loadReaction()
		}, []
	)

	async function handleUpdate() {
		const results = resultsStr
      .split(',')
      .map(s => s.trim())
		await updateReaction(
			id,
			{
				element_a,
				element_b,
				results
			}
		)
		alert('Реакция обновлена')
		router.back()
	}

	return (
		<ScrollView>
			<View style={styles.backgroundRect}>
				<View style={styles.foregroundRect}>
					<View style={styles.subtitleBlock}>
						<Text style={styles.subtitleText}>
							Изменение реакции
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