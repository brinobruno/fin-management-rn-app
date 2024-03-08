import { ListRenderItem } from 'react-native'
import { TransactionCard, TransactionData } from '../TransactionCard'
import { Container, Title, TransactionsList } from './styles'

export function Transactions() {
  const DATA: TransactionData[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de Site',
      amount: 'R$ 12.000,00',
      category: { name: 'Vendas', icon: 'dollar-sign' },
      date: '13/04/2020',
    },
    {
      id: '2',
      type: 'negative',
      title: 'Pizzaria',
      amount: 'R$ 59,00',
      category: { name: 'Alimentação', icon: 'coffee' },
      date: '05/04/2020',
    },
    {
      id: '3',
      type: 'negative',
      title: 'Aluguel do apartamento',
      amount: 'R$ 1.200,00',
      category: { name: 'Casa', icon: 'home' },
      date: '27/03/2020',
    },
  ]

  const renderItem: ListRenderItem<unknown> = ({ item }) => {
    const transactionItem = item as TransactionData
    return <TransactionCard data={transactionItem} />
  }

  const keyExtractor = (item: unknown) => {
    const transactionItem = item as TransactionData
    return transactionItem.id
  }

  return (
    <Container>
      <Title>Listagem</Title>

      <TransactionsList
        data={DATA}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Container>
  )
}
