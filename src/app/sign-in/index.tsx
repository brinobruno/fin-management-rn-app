import { useNavigation } from 'expo-router'

import { Container, Title, Button } from './styles'

export default function SignIn() {
  const navigation = useNavigation()

  function redirectAfterLogin() {
    navigation.navigate('index/index' as never)
  }

  return (
    <Container>
      <Title>Sign in</Title>
      <Button onPress={redirectAfterLogin} title="back" />
    </Container>
  )
}
