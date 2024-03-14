import { useEffect, useState } from 'react'
import { VictoryPie } from 'victory-native'
import { useTheme } from 'styled-components/native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { RFValue } from 'react-native-responsive-fontsize'
import { addMonths, format, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { HistoryCard } from '@/components/HistoryCard'
import { TransactionData } from '@/components/TransactionCard'
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
} from './styles'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

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
    const transactions = await LoadTransactionsData()

    const expenses = transactions.filter(
      (expense) => expense.type === 'negative',
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
  }

  useEffect(() => {
    ProcessTransactions()
  }, [])

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          padding: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <GestureHandlerRootView>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <SelectIcon name="chevron-left" />
            </MonthSelectButton>
          </GestureHandlerRootView>

          <Month>
            {format(selectedDate, 'MMMM, yyyy', {
              locale: ptBR,
            })}
          </Month>

          <GestureHandlerRootView>
            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <SelectIcon name="chevron-right" />
            </MonthSelectButton>
          </GestureHandlerRootView>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="percent"
            y="total"
            colorScale={totalByCategories.map((category) => category.color)}
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
      </Content>
    </Container>
  )
}
