import { TouchableOpacityProps } from 'react-native'

import { Container, Category, Icon } from './styles'
import { Link } from 'expo-router'

interface CategorySelectProps extends TouchableOpacityProps {
  title: string
}

export function CategorySelect({ title, ...rest }: CategorySelectProps) {
  return (
    <Container {...rest}>
      <Link href="/category/">
        <Category>{title}</Category>
        <Icon name="chevron-down" />
      </Link>
    </Container>
  )
}
