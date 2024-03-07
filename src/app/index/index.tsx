import {
  Container,
  Header,
  Photo,
  SignOutIcon,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from './styles'

export default function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/brinobruno.png' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Bruno</UserName>
            </User>
          </UserInfo>

          <SignOutIcon name="power" />
        </UserWrapper>
      </Header>
    </Container>
  )
}
