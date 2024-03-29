import { useEffect, useState } from 'react'
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
import { constants } from '@/utils/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useNavigation } from 'expo-router'
import { LoadTransactionsData } from '@/utils/loadTransactions'

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

const transactionsDataKey = constants.transactions_data_key

export default function Register() {
  const navigation = useNavigation()

  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'Category',
    name: 'Categoria',
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  function handleTransactionTypeSelection(
    transactionType: 'positive' | 'negative',
  ) {
    setTransactionType(transactionType)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function resetFields() {
    reset()
    setTransactionType('')
    setCategory({
      key: 'Category',
      name: 'Categoria',
    })
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert('Selecione o tipo da transação')
    if (category.key === 'category') return Alert.alert('Selecione a categoria')

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const transactionsData = await AsyncStorage.getItem(transactionsDataKey)

      const currentTransactionsData = transactionsData
        ? JSON.parse(transactionsData)
        : []

      const formattedData = [...currentTransactionsData, newTransaction]

      await AsyncStorage.setItem(
        transactionsDataKey,
        JSON.stringify(formattedData),
      )

      resetFields()
      navigation.navigate('index/index' as never)
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível salvar')
    }
  }

  useEffect(() => {
    LoadTransactionsData()
  }, [])

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
            error={errors.amount ? errors.amount.message : undefined}
          />

          <TransactionTypes>
            <TransactionTypeButton
              title="Entrada"
              type="positive"
              onPress={() => handleTransactionTypeSelection('positive')}
              isActive={transactionType === 'positive'}
            />
            <TransactionTypeButton
              title="Saída"
              type="negative"
              onPress={() => handleTransactionTypeSelection('negative')}
              isActive={transactionType === 'negative'}
            />
          </TransactionTypes>

          <CategorySelectButton
            title={category.name}
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
