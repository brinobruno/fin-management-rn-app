import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components/native'

export function Loading() {
  const theme = useTheme()

  return <ActivityIndicator color={theme.colors.success_light} />
}
