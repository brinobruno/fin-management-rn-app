import { Link } from 'expo-router'

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
import { HighlightCards } from '@/components/HighlightCard/styles'
import { HighlightCard } from '@/components/HighlightCard'
import { Transactions } from '@/components/Transactions'

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

          <Link href="/register/">
            <SignOutIcon name="power" />
          </Link>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última entrada dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transactions />
    </Container>
  )
}
