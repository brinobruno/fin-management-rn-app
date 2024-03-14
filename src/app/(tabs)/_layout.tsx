import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { Platform } from 'react-native'

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        },
      }}
    >
      <Tabs.Screen
        name="index/index"
        options={{
          title: 'Listagem',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              size={size}
              name="format-list-bulleted"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="register/index"
        options={{
          title: 'Cadastrar',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons size={size} name="attach-money" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="summary/index"
        options={{
          title: 'Resumo',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons size={size} name="pie-chart" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
