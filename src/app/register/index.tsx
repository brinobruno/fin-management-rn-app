import { useState } from 'react'

import {
  Input,
  Button,
  TransactionTypeButton,
  CategorySelectButton,
} from '@/components/'
import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionTypes,
} from './styles'
import { Modal } from 'react-native'
import CategorySelect from '../category'

export default function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'Category',
    name: 'Categoria',
  })

  function handleTransactionTypeSelection(transactionType: 'up' | 'down') {
    setTransactionType(transactionType)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionTypes>
            <TransactionTypeButton
              title="Entrada"
              type="up"
              onPress={() => handleTransactionTypeSelection('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              title="Saída"
              type="down"
              onPress={() => handleTransactionTypeSelection('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionTypes>

          <CategorySelectButton
            title={category.name}
            activeOpacity={0.75}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button title="Enviar" activeOpacity={0.75} />

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Form>
    </Container>
  )
}
