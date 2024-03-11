import { FlatList } from 'react-native'

import { categories } from '@/utils/categories'
import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles'
import { Button } from '../Form/Button'

type CategoryType = {
  key: string
  name: string
}

interface SelectCategoryProps {
  category: CategoryType
  setCategory: (category: CategoryType) => void
  closeSelectCategory: () => void
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: SelectCategoryProps) {
  function handleCategorySelect(category: CategoryType) {
    setCategory(category)
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
            activeOpacity={0.75}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button
          title="Selecionar"
          activeOpacity={0.75}
          onPress={closeSelectCategory}
        />
      </Footer>
    </Container>
  )
}
