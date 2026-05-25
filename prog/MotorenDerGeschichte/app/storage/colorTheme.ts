import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getTheme(): Promise<string> {
    const theme = await AsyncStorage.getItem('theme')
    if (!theme) return 'blue'
    return theme
}

export async function toggleTheme(theme: string): Promise<string> {
    await AsyncStorage.setItem('theme', theme)
    return theme
}