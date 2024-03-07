/* eslint-disable camelcase */
import { Slot } from 'expo-router'
import { ThemeProvider } from 'styled-components/native'
import theme from '@/styles/theme'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  if (fontsLoaded) {
    SplashScreen.hideAsync()
  } else {
    return
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <Slot />
    </ThemeProvider>
  )
}
