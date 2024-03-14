import { useEffect, useState } from 'react'
import { VictoryPie } from 'victory-native'

import { HistoryCard } from '@/components/HistoryCard'
import { LoadTransactionsData } from '@/utils/loadTransactions'
import { Container, Header, Title, Content, ChartContainer } from './styles'
import { categories } from '@/utils/categories'
import { TransactionData } from '@/components/TransactionCard'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components/native'

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

  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

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

      <Content>
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
