import { Amount, Container, Title } from './styles'

interface HistoryCardProps {
  title: string
  amount: string
  color: string
}

export function HistoryCard({ title, color, amount }: HistoryCardProps) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  )
}
