import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled(TouchableOpacity).attrs({})`
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 100%;
  border-radius: 6px;
  padding: 18px;

  align-items: center;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.shape};
`
