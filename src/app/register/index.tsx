import { useState } from 'react'

import {
  Input,
  Button,
  TransactionTypeButton,
  CategorySelect,
} from '@/components/'
import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionTypes,
} from './styles'

export default function Register() {
  const [transactionType, setTransactionType] = useState('')

  function handleTransactionTypeSelection(transactionType: 'up' | 'down') {
    setTransactionType(transactionType)
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

          <CategorySelect title="Categoria" activeOpacity={0.75} />
        </Fields>

        <Button title="Enviar" activeOpacity={0.75} />
      </Form>
    </Container>
  )
}
