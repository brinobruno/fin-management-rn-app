import { useState } from 'react'
import { Modal, Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionTypes,
} from './styles'
import { InputForm } from '@/components/Form/InputForm'
import { TransactionTypeButton } from '@/components/Form/TransactionTypeButton'
import { CategorySelectButton } from '@/components/Form/CategorySelectButton'
import { Button } from '@/components/Form/Button'
import { CategorySelect } from '@/components/CategorySelect'

export interface FormData {
  name: string
  amount: number
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório'),
})

export default function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'Category',
    name: 'Categoria',
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
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

  function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert('Selecione o tipo da transação')

    if (category.key === 'category') return Alert.alert('Selecione a categoria')

    const data = {
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
    }

    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm
            name="name"
            placeholder="Nome"
            control={control}
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name ? errors.name.message : undefined}
          />

          <InputForm
            name="amount"
            placeholder="Preço"
            control={control}
            keyboardType="numeric"
            error={errors.name ? errors.name.message : undefined}
          />

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

        <Button
          title="Enviar"
          activeOpacity={0.75}
          onPress={handleSubmit(handleRegister)}
        />

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
