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
import { useCallback, useEffect, useState } from 'react'
import { TransactionData } from '@/components/TransactionCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { constants } from '@/utils/constants'
import { useFocusEffect } from '@react-navigation/native'

const transactionsDataKey = `${constants.storage_name_pattern}:transactions`

type HighlightProps = {
  amount: string
}

interface HighlightData {
  entries: HighlightProps
  expenses: HighlightProps
  total: HighlightProps
}

export default function Dashboard() {
  const [transactionsData, setTransactionsData] = useState<TransactionData[]>(
    [],
  )
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData,
  )

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(transactionsDataKey)
    const transactions = response ? JSON.parse(response) : []

    let entriesSum = 0
    let expensesSum = 0

    const formattedTransactions: TransactionData[] = transactions.map(
      (transaction: TransactionData) => {
        if (transaction.type === 'positive') {
          entriesSum += Number(transaction.amount)
        } else {
          expensesSum += Number(transaction.amount)
        }

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

    const total = entriesSum - expensesSum

    setHighlightData({
      entries: {
        amount: entriesSum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
      expenses: {
        amount: expensesSum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
    })
    setTransactionsData(formattedTransactions)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadTransactions()
    }, []),
  )

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
          amount={highlightData.entries.amount}
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount={highlightData.expenses.amount}
          lastTransaction="Última entrada dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transactions data={transactionsData} />
    </Container>
  )
}
