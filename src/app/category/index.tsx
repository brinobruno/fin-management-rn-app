import { Container, Header, Title } from './styles'

type CategoryType = {
  key: string
  name: string
}

interface SelectCategoryProps {
  category: string
  setCategory: (category: CategoryType) => void
  closeSelectCategory: () => void
}

export default function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: SelectCategoryProps) {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
    </Container>
  )
}
