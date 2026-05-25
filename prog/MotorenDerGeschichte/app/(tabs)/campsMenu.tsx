import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import useTheme from '@/components/themes/loadTheme'
import { createStyles } from '../styles'

export default function screen404() {
  let styles = createStyles(useTheme())

  return (
    <View style={styles.backgroundRect}>
      <View style={styles.foregroundRect}>
        <View style={styles.titleBlock}>
          <Text style={styles.titleText}>
            Этой страницы нет
          </Text>
        </View>

        <View style={styles.buttonBlockMain}>
          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => navigation.navigate('mainMenu')}
          >
            <Text style={styles.menuBtnText}>
              Перейти на главный экран
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
