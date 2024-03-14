import AsyncStorage from '@react-native-async-storage/async-storage'

import { constants } from './constants'
import { TransactionData } from '@/components/TransactionCard'

const transactionsDataKey = constants.transactions_data_key

export async function LoadTransactionsData(): Promise<TransactionData[]> {
  const transactionsResponse = await AsyncStorage.getItem(transactionsDataKey)

  const formattedTransactions = transactionsResponse
    ? JSON.parse(transactionsResponse)
    : []

  return formattedTransactions
}
