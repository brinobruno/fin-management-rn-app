import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { GestureHandlerRootViewProps } from 'react-native-gesture-handler/lib/typescript/components/GestureHandlerRootView'

import { Container, Category, Icon } from './styles'

interface CategorySelectProps extends GestureHandlerRootViewProps {
  title: string
  onPress: () => void
}

export function CategorySelectButton({ title, ...rest }: CategorySelectProps) {
  return (
    <GestureHandlerRootView {...rest}>
      <Container {...rest}>
        <Category>{title}</Category>
        <Icon name="chevron-down" />
      </Container>
    </GestureHandlerRootView>
  )
}
