import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import useTheme from '@/components/themes/loadTheme'
import { createStyles } from '../styles'

export default function HomeScreen() {
  let styles = createStyles(useTheme())

  return (
    <View style={styles.backgroundRect}>
      <View style={styles.foregroundRect}>
        <View style={styles.titleBlock}>
          <Text style={styles.titleText}>
            Motoren der Geschichte
          </Text>
        </View>

        <View style={styles.buttonBlockMain}>
          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => navigation.navigate('campsMenu')}
          >
            <Text style={styles.menuBtnText}>
              Начать
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => navigation.navigate('settings')}
          >
            <Text style={styles.menuBtnText}>
              Настройки
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => navigation.navigate('devPanel')}
          >
            <Text style={styles.menuBtnText}>
              Режим разработчика
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}