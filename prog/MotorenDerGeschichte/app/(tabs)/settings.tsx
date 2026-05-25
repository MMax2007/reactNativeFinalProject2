import { View, Text, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import useTheme from '@/components/themes/loadTheme'
import { createStyles } from '../styles'
import { toggleTheme } from '../storage/colorTheme'
import { useEffect, useState } from 'react'
import { getAllCampaigns } from '../api/campaignsAPI'
import { createCampaignSave } from '../storage/campaign'
import { Campaign } from '../types/campaign'

export default function settings() {
  const [theme, setTheme] = useState('blue')
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<string>('')

  useEffect(
    () => {
      async function loadCamps() {
        const data = await getAllCampaigns()
        setCampaigns(data)
        if (data.length > 0) {
          setSelectedCampaign(data[0].id)
        }
      }
      loadCamps()
    }, []
  )

  let styles = createStyles(useTheme())

  return (
    <View style={styles.backgroundRect}>
      <View style={styles.foregroundRect}>
        <View style={styles.subtitleBlock}>
          <Text style={styles.subtitleText}>
            Настройки
          </Text>
        </View>

        <View style={styles.settingsBlockMain}>
          <View style={styles.horizontal}>
            <Text style={styles.interfaceText}>
              Цветовая тема интерфейса:
            </Text>
            <Picker
              selectedValue={theme}
              onValueChange={
                (value) => {
                  setTheme(value)
                  toggleTheme(value)
                }
              }
              style={styles.picker}
            >
              <Picker.Item
                label='Синяя'
                value='blue'
              />
              <Picker.Item
                label='Белая'
                value='white'
              />
              <Picker.Item
                label='Чёрная'
                value='black'
              />
              <Picker.Item
                label='Зелёная'
                value='green'
              />
              <Picker.Item
                label='Бледно-синяя'
                value='paleBlue'
              />
              <Picker.Item
                label='Состаренная'
                value='ancient'
              />
            </Picker>
          </View>
          
          <View style={styles.horizontal}>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={async () => {
                await createCampaignSave(selectedCampaign)
              }}
            >
              <Text style={styles.menuBtnText}>
                Сбросить прогресс
              </Text>
            </TouchableOpacity>
            <Picker
              selectedValue={selectedCampaign}
              onValueChange={
                (value) => {
                  setSelectedCampaign(value)
                }
              }
              style={styles.picker}
            >
              {
                campaigns.map(
                  (campaign) => (
                    <Picker.Item
                      key={campaign.id}
                      label={campaign.title}
                      value={campaign.id}
                    />
                  )
                )
              }
            </Picker>
          </View>
        </View>
      </View>
    </View>
  )
}
