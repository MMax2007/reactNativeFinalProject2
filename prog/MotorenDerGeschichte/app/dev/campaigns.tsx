import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { router } from 'expo-router'
import useTheme from '@/components/themes/loadTheme'
import { createStyles } from '../styles'
import { useEffect, useState } from 'react'
import { Campaign } from '../types/campaign'
import { getAllCampaigns } from '../api/campaignsAPI'
import CampaignCard from '@/components/cards/campaignCard'

export default function devPanelCampaigns() {
  let styles = createStyles(useTheme())
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  async function loadCamps() {
    const data = await getAllCampaigns()
    setCampaigns(data)
  }

  useEffect(
    () => {
      loadCamps()
    }, []
  )

  return (
    <View style={styles.backgroundRect}>
      <View style={styles.foregroundRect}>
        <View style={styles.subtitleBlock}>
          <Text style={styles.subtitleText}>
            Кампании
          </Text>
        </View>

        <TouchableOpacity
            style={styles.interfaceBtn}
            onPress={() => router.push('/dev/campaignCreate')}
          >
            <Text style={styles.menuBtnText}>
              Создать новую кампанию
            </Text>
          </TouchableOpacity>

        <FlatList
          data={campaigns}
          keyExtractor={(item) => item.id}
          renderItem={
            ({item}) => (
              <CampaignCard
                camp={item}
                styles={styles}
                onDelete={loadCamps}
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