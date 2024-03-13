import { categories } from '@/utils/categories'
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  TransactionDate,
} from './styles'

export interface TransactionData {
  id: string
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

export interface TransactionCardProps {
  data: TransactionData
}

export function TransactionCard({ data }: TransactionCardProps) {
  const { type, name, amount, date } = data

  const [category] = categories.filter((item) => item.key === data.category)

  return (
    <Container>
      <Title>{name}</Title>

      <Amount type={type}>
        {type === 'negative' ? `- ${amount}` : amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <TransactionDate>{date}</TransactionDate>
      </Footer>
    </Container>
  )
}
