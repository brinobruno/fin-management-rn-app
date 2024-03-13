import { ActivityIndicator } from 'react-native'
import styled from 'styled-components'
import { useTheme } from 'styled-components/native'

export function Loading() {
  const theme = useTheme()

  return <Container color={theme.colors.primary} />
}

export const Container = styled(ActivityIndicator).attrs({
  size: 'large',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`
