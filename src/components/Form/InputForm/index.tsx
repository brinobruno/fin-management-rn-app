import { TextInputProps } from 'react-native'
import { Controller, Control, FieldValues } from 'react-hook-form'

import { Input } from '../Input'
import { Container, ErrorText } from './styles'
import { FormData } from '@/app/register'

interface InputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>
  name: keyof T
  error?: string
}

export function InputForm({
  control,
  name,
  error,
  ...rest
}: InputProps<FormData>) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            {...rest}
            onChangeText={onChange}
            value={value ? value.toString() : ''}
          />
        )}
        name={name}
      />

      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  )
}
