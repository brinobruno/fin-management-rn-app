import React from 'react'
import { Tabs } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colors.secondary }}>
      <Tabs.Screen
        name="index/index"
        options={{
          title: 'Listagem',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="list" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="register/index"
        options={{
          title: 'Cadastrar',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="dollar-sign" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
