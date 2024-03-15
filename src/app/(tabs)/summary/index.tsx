import { useCallback, useState } from 'react'
import { VictoryPie } from 'victory-native'
import { useTheme } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { addMonths, format, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { HistoryCard } from '@/components/HistoryCard'
import { TransactionData } from '@/components/TransactionCard'
import { Loading } from '@/components/Loading'
import { LoadTransactionsData } from '@/utils/loadTransactions'
import { categories } from '@/utils/categories'
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
  Empty,
  Notice,
} from './styles'
import { useFocusEffect } from '@react-navigation/native'

interface CategoryData {
  key: string
  name: string
  total: number
  formattedTotal: string
  color: string
  percent: string
}

export default function Summary() {
  const theme = useTheme()

  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  function handleDateChange(action: 'prev' | 'next') {
    if (action === 'prev') {
      setSelectedDate(subMonths(selectedDate, 1))
    } else {
      setSelectedDate(addMonths(selectedDate, 1))
    }
  }

  async function ProcessTransactions() {
    setIsLoading(true)

    const transactions = await LoadTransactionsData()

    const expenses = transactions.filter(
      (expense) =>
        expense.type === 'negative' &&
        new Date(expense.date).getMonth() === selectedDate.getMonth() &&
        new Date(expense.date).getFullYear() === selectedDate.getFullYear(),
    )

    const expensesTotal = expenses.reduce(
      (accumulator: number, expense: TransactionData) => {
        return accumulator + Number(expense.amount)
      },
      0,
    )

    const totalByCategory: CategoryData[] = []

    categories.forEach((category) => {
      let categorySum = 0

      expenses.forEach((expense) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount)
        }
      })

      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })

        const percent = `${((categorySum / expensesTotal) * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          formattedTotal: total,
          percent,
        })
      }
    })

    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      ProcessTransactions()
    }, [selectedDate]),
  )

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ? (
        <Loading />
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            padding: 24,
            paddingBottom: 104,
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <SelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, 'MMMM, yyyy', {
                locale: ptBR,
              })}
            </Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <SelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          {totalByCategories.length < 0 ? (
            <>
              <ChartContainer>
                <VictoryPie
                  data={totalByCategories}
                  x="percent"
                  y="total"
                  colorScale={totalByCategories.map(
                    (category) => category.color,
                  )}
                  labelRadius={50}
                  style={{
                    labels: {
                      fontSize: RFValue(18),
                      fontWeight: 'bold',
                      fill: theme.colors.shape,
                    },
                  }}
                />
              </ChartContainer>

              {totalByCategories.map(({ key, name, formattedTotal, color }) => (
                <HistoryCard
                  key={key}
                  title={name}
                  amount={formattedTotal}
                  color={color}
                />
              ))}
            </>
          ) : (
            <Empty>
              <Notice>Não há transações registradas</Notice>
            </Empty>
          )}
        </Content>
      )}
    </Container>
  )
}
