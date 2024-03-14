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
import { Loading } from '@/components/Loading'

const transactionsDataKey = constants.transactions_data_key

type HighlightProps = {
  amount: string
  lastTransaction: string
}

interface HighlightData {
  entries: HighlightProps
  expenses: HighlightProps
  total: HighlightProps
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactionsData, setTransactionsData] = useState<TransactionData[]>(
    [],
  )
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData,
  )

  function getLastTransactionDate(
    collection: TransactionData[],
    type: 'positive' | 'negative',
  ) {
    const lastTransaction = new Date(
      Math.max(
        ...collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime()),
      ),
    )

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
  }

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

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      'positive',
    )
    const lastTransactionExpenses = getLastTransactionDate(
      transactions,
      'negative',
    )
    const totalInterval = `01 a ${lastTransactionExpenses}`

    const total = entriesSum - expensesSum

    setHighlightData({
      entries: {
        amount: entriesSum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
      },

      expenses: {
        amount: expensesSum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpenses}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    })
    setTransactionsData(formattedTransactions)
    setIsLoading(false)
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
              lastTransaction={
                highlightData.entries.lastTransaction === null
                  ? highlightData.entries.lastTransaction
                  : 'Você ainda não registrou entradas'
              }
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expenses.amount}
              lastTransaction={
                highlightData.expenses.lastTransaction === null
                  ? highlightData.expenses.lastTransaction
                  : 'Você ainda não registrou saídas'
              }
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={
                highlightData.total.lastTransaction === null
                  ? highlightData.total.lastTransaction
                  : 'Você ainda não registrou transações'
              }
            />
          </HighlightCards>

          <Transactions data={transactionsData} />
        </>
      )}
    </Container>
  )
}
