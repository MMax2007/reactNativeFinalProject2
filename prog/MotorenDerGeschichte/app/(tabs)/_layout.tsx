import { Tabs } from 'expo-router'
import React from 'react'

import { HapticTab } from '@/components/haptic-tab'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="mainMenu"
        options={{
          title: 'Главное меню',
          tabBarIcon: ({ color }) => <Ionicons name='home-outline' size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="campsMenu"
        options={{
          title: 'Выбор кампании',
          tabBarIcon: ({ color }) => <Ionicons name='airplane-outline' size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Настройки',
          tabBarIcon: ({ color }) => <Ionicons name='settings-outline' size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="devPanel"
        options={{
          title: 'Панель разработчика',
          tabBarIcon: ({ color }) => <Ionicons name='add-circle-outline' size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
