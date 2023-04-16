import React, { useRef, useState } from 'react'
import Select from 'react-select'
import TimePicker from 'react-time-picker';
import TodoDatePicker from './todoForm/TodoDatePicker'

import { addTodo } from '@/store/slice/user.slice'
import { useAppDispatch, useAppSelector } from '@/store/storeHooks'
import { Section } from '@/types/types'
import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Textarea, } from '@chakra-ui/react'
import { useDefaultInput } from '@/hooks/useDefaultInput'

import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';

type Props = {}

const CreateTodoForm = (props: Props) => {
  const [group, setGroup,]  = useState<Section>()
  const [isCreated, setIsCreate] = useState<boolean>(false)
  const [isDirty, setIsDirty] = useState<boolean>(false)

  const [todoName, todoError, onChangeHandler ] = useDefaultInput()
  const [todoContent,contentError,textareaOnChange  ] = useDefaultInput()

  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<any>('23:59')

  const dispatch = useAppDispatch()
  const sections = useAppSelector(e => e.user?.sections ?? [])

  const datePickerHandler = (date: Date|null ) => setDate(date)
  
  const createTodo =  () => {
    setIsCreate(true)
    dispatch(addTodo({
      content: todoContent,
      title: todoName,
      section: group,
      date: date ?? undefined,
      time: time ?? undefined
    }))
    .finally(() => {
      setIsCreate(false)
    })
  }
  
  const submitDisabled = isCreated || todoName === '' || todoContent === ''
  const firstInputInvalid  = todoName === '' && isDirty;
  const textAreatInvalid = todoContent === '' && isDirty;
  const valid = !firstInputInvalid && !textAreatInvalid

  return (
    <FormControl pt={10} isInvalid={!valid} >
        <Heading mb={4}>
          Создание Todo-элемента
        </Heading>
        <FormLabel>
          Введите название
        </FormLabel>
        <Input 
          onFocus={() => setIsDirty(true)}
          isInvalid={firstInputInvalid}
          required
          value={todoName}
          onChange={onChangeHandler}
          placeholder='Заголовок Todo' 
          maxW={'480px'}
        />
        <FormErrorMessage>
          {todoError}
        </FormErrorMessage>

        <FormLabel>
          Введите Контент
        </FormLabel>

        <Textarea 
          onFocus={() => setIsDirty(true)}
          value={todoContent}
          isInvalid={textAreatInvalid}
          placeholder="Введите текстовое содержание" 
          onChange={textareaOnChange}
        />
        <FormErrorMessage>
          {contentError}
        </FormErrorMessage>
          
        <FormLabel>
          Время завершения туду (необязательно)
        </FormLabel>

        <TodoDatePicker
          initialValue={date}
          onChange={datePickerHandler}
        />    

        {date &&
          <TimePicker
            value={time ?? "23:59"}
            disableClock
            onChange={e => setTime(e)}
          />
        }

        <FormLabel>
          Выберите группу (необязательно)
        </FormLabel>

        <Select 
          getOptionLabel={opt => opt.name}
          getOptionValue={opt => opt.name}
          placeholder={'Выберите группу'}
          onChange={e =>  setGroup(e as Section)}
          options={sections}
        />

        <Button 
            isLoading={isCreated} 
            isDisabled={submitDisabled} 
            onClick={createTodo}
            mt={5}
        >
          Создать
        </Button>

    </FormControl>
  )
}

export default CreateTodoForm