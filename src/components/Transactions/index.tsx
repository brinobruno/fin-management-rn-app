import { TransactionCard, TransactionData } from '../TransactionCard'
import { Container, Title, TransactionsList } from './styles'

interface Props {
  data: TransactionData[]
}

const keyExtractor = (item: unknown) => {
  const transactionItem = item as TransactionData
  return transactionItem.id
}

export function Transactions({ data }: Props) {
  return (
    <Container>
      <Title>Listagem</Title>

      <TransactionsList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <TransactionCard data={item as TransactionData} />
        )}
      />
    </Container>
  )
}
