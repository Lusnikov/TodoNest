import { createGroup } from '@/store/slice/user.slice'
import { useAppDispatch } from '@/store/storeHooks'
import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

type Props = {}

function validate(str: string): string {
    if (str === ''){
        return 'Пустое поле'
    }
    return ''
    // const regex = /^[а-яА-Яa-zA-Z0-9\s]+$/
    // return regex.test(str) ? 'Недопустимые символы ' : '';
  }

const CreateGroupForm = (props: Props) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [inputIsDirty, setInputIsDirty] = useState<boolean>(false)
  const [inputError, setInputError] = useState<string>('')
  const [sending, setSending] = useState<boolean>(false)

  const isDisabled = !inputIsDirty || inputError !== '' || inputValue === ''
  const dispatch = useAppDispatch()

  const onAdd = () => {
    dispatch(createGroup(inputValue))
  }

//   const validationStatus = validateStringWithNumbers(inputValue)

  useEffect(() => {
    if (!inputIsDirty) return
    const result  = validate(inputValue)
    if (result === '') return setInputError('')
    return setInputError(result)

  }, [inputValue])

  return (
    <FormControl isInvalid={true}>
        <FormLabel>Наименование группы</FormLabel>
        <Input type='email' 
            
            value={inputValue} 
            onFocus={() => {
                setInputIsDirty(true)
            }}
            onChange={e => {
                setInputValue(e.target.value)

            }}
            placeholder='Введите наименование группы' 
        />
        <FormErrorMessage>{inputError}</FormErrorMessage>

        <Button 
            isDisabled={isDisabled} 
            onClick={onAdd}
            mt={4} 
        > 
            Добавить
        </Button>
    </FormControl>
  )
}

export default CreateGroupForm