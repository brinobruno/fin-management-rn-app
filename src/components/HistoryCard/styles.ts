import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface ContainerProps {
  color: string
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  padding: 12px 24px;
  margin-bottom: 8px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 6px;
  border-left-width: 5px;
  border-left-color: ${({ color }) => color};
  background-color: ${({ theme }) => theme.colors.shape};
`

const TextContent = styled.Text`
  font-size: ${RFValue(16)}px;
`

export const Title = styled(TextContent)`
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const Amount = styled(TextContent)`
  font-family: ${({ theme }) => theme.fonts.bold};
`
