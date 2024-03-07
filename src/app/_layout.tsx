/* eslint-disable camelcase */
import { Slot } from 'expo-router'
import { ThemeProvider } from 'styled-components/native'
import theme from '@/styles/theme'
import { StatusBar } from 'expo-status-bar'
// import * as SplashScreen from 'expo-splash-screen'

// import {
//   useFonts,
//   OpenSans_700Bold,
//   OpenSans_400Regular,
//   OpenSans_600SemiBold,
// } from '@expo-google-fonts/open-sans'

// SplashScreen.preventAutoHideAsync()

export default function Layout() {
  // const [fontsLoaded] = useFonts({
  //   OpenSans_600SemiBold,
  //   OpenSans_400Regular,
  //   OpenSans_700Bold,
  // })

  // if (fontsLoaded) {
  //   SplashScreen.hideAsync()
  // } else {
  //   return
  // }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <Slot />
    </ThemeProvider>
  )
}
