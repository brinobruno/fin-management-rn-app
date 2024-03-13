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

type Category = {
  name: string
  icon: string
}

export interface TransactionData {
  id: string
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: Category
  date: string
}

export interface TransactionCardProps {
  data: TransactionData
}

export function TransactionCard({ data }: TransactionCardProps) {
  const { type, name, amount, category, date } = data

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
