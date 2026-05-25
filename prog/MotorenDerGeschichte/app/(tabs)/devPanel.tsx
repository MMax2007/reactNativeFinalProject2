import { View, Text, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { router } from 'expo-router'
import useTheme from '@/components/themes/loadTheme'
import { createStyles } from '../styles'

export default function devPanel() {
  let styles = createStyles(useTheme())

  return (
    <View style={styles.backgroundRect}>
      <View style={styles.foregroundRect}>
        <View style={styles.subtitleBlock}>
          <Text style={styles.subtitleText}>
            Панель разработчика
          </Text>
        </View>

        <View style={styles.devPanelBlockMain}>
          <Text style={styles.subtitleText}>
            Выберите раздел
          </Text>

          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => router.push('/dev/campaigns')}
          >
            <Text style={styles.menuBtnText}>
              Кампании
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => router.push('/dev/groups')}
          >
            <Text style={styles.menuBtnText}>
              Группы
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => router.push('/dev/elements')}
          >
            <Text style={styles.menuBtnText}>
              Элементы
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => router.push('/dev/reactions')}
          >
            <Text style={styles.menuBtnText}>
              Реакции
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
