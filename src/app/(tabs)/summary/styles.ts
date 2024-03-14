import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(112)}px;
  padding-bottom: 18px;

  align-items: center;
  justify-content: flex-end;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`

export const Content = styled.ScrollView.attrs({
  flex: 1,
  contentContainerStyle: { padding: 24 },
})``

export const ChartContainer = styled.View`
  width: 100%;

  align-items: center;
`
