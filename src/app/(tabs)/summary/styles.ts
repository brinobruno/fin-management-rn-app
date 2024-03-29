import { Feather } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'
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

export const Content = styled.ScrollView``

export const ChartContainer = styled.View`
  width: 100%;

  align-items: center;
`

export const MonthSelect = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 24px;
`

export const MonthSelectButton = styled(BorderlessButton)``

export const SelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`

export const Empty = styled.View`
  margin-top: 34px;
  justify-content: center;
  align-items: center;
`

export const Notice = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`
