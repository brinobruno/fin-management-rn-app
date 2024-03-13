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
  LogoutButton,
} from './styles'
import { HighlightCards } from '@/components/HighlightCard/styles'
import { HighlightCard } from '@/components/HighlightCard'
import { Transactions } from '@/components/Transactions'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
import { TransactionData } from '@/components/TransactionCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { constants } from '@/utils/constants'

const transactionsDataKey = `${constants.storage_name_pattern}:transactions`

export default function Dashboard() {
  const [data, setData] = useState<TransactionData[]>([])

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(transactionsDataKey)
    const transactions = response ? JSON.parse(response) : []

    const formattedTransactions: TransactionData[] = transactions.map(
      (transaction: TransactionData) => {
        const amount = Number(transaction.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(transaction.date))

        return {
          id: transaction.id,
          name: transaction.name,
          category: transaction.category,
          type: transaction.type,
          amount,
          date,
        }
      },
    )

    setData(formattedTransactions)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

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

          <GestureHandlerRootView>
            <LogoutButton onPress={() => {}}>
              <SignOutIcon name="power" />
            </LogoutButton>
          </GestureHandlerRootView>
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

      <Transactions data={data} />
    </Container>
  )
}
