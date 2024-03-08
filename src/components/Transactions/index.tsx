import { TransactionCard } from '../TransactionCard'
import { Container, Title } from './styles'

export function Transactions() {
  return (
    <Container>
      <Title>Listagem</Title>

      <TransactionCard />
    </Container>
  )
}
