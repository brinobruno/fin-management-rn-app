import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'

interface TransactionProps {
  type: 'positive' | 'negative'
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 6px;

  padding: 18px 24px;
  margin-bottom: 16px;
`

const RegularText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const Title = styled(RegularText)`
  font-size: ${RFValue(14)}px;
`

export const Amount = styled(RegularText)<TransactionProps>`
  font-size: ${RFValue(20)}px;
  margin-top: 2px;

  color: ${({ theme, type }) =>
    type === 'positive' ? theme.colors.success : theme.colors.attention};
`

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 20px;
`

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`

const TransactionInfo = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const CategoryName = styled(TransactionInfo)`
  margin-left: 16px;
`

export const TransactionDate = styled(TransactionInfo)``
