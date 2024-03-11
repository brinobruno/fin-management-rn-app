import { TouchableOpacityProps } from 'react-native'

import { Container, Category, Icon } from './styles'

interface CategorySelectProps extends TouchableOpacityProps {
  title: string
}

export function CategorySelectButton({ title, ...rest }: CategorySelectProps) {
  return (
    <Container {...rest}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  )
}
