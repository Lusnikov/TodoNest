import React, { useEffect, useMemo, useRef, useState } from 'react'
import Select from 'react-select'
import TimePicker from 'react-time-picker';

import { addTodo } from '@/store/slice/user.slice'
import { useAppDispatch, useAppSelector } from '@/store/storeHooks'
import { Section, Todos } from '@/types/types'
import { Alert, Button, CloseButton, FormControl, FormErrorMessage, FormLabel, Heading, Input, Textarea, } from '@chakra-ui/react'
import { useDefaultInput } from '@/hooks/useDefaultInput'

import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import TodoDatePicker from '../todoForm/TodoDatePicker';

type Props = {
  todo: Todos,
  // initialData: {
  //   title: string,
  //   content: string,
  //   section: Section| null ,
  //   date: Date
  // },
  sections: Section[],
  onCloseButtonClick: () => void,
  onSubmitForm: (data: Todos) => void,
  message?: string | null ,
  onChangeValid: (e: Todos| null) => void,
  isLoading: boolean
}


type FormValues = Pick<Todos, 'title'|'content'|'dateEnded'|'section'>

const EditFormTodo = (props: Props) => {
  const {
    todo, 
    sections,
    onSubmitForm, 
    message=null,
    onCloseButtonClick, 
    onChangeValid,
    isLoading
  } = props
  const { register, handleSubmit, formState, watch , formState: { isValidating }, setValue, getValues} = useForm<Todos>({
    defaultValues:{
        completed: todo.completed,
        content:  todo.content,
        dateCreated: todo.dateCreated,
        dateEnded:  todo.dateEnded,
        id: todo.id,
        section: todo.section,
        title: todo.title,
    },
  })

  const dateEnded = watch('dateEnded') ?? null
  const onSubmit:SubmitHandler<Todos> = (data) => onSubmitForm(data);

  const data = watch();

  React.useEffect(() => {
    const isValid = formState.isValid && !isValidating;
    onChangeValid(isValid ? data : null)
  }, [formState.isValid, JSON.stringify(data), isValidating]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {todo.id}
  <FormControl pt={10}  >
    <Heading mb={4}>
      Редактирование Todo-элемента 
    </Heading>
    {message &&  <Alert >
      {message}
    </Alert> }
  
    <FormLabel>
      Введите название
    </FormLabel>
    <Input 
      required
      placeholder='Заголовок Todo' 
      maxW={'480px'}
      {...register('title', {required: true})}

    />
   
    <FormLabel>
      Введите Контент
    </FormLabel>

    <Textarea 
      placeholder="Введите текстовое содержание" 
      {...register('content', {required: true})}
    />

    <FormLabel>
      Время завершения туду (необязательно)
    </FormLabel>

    <TodoDatePicker
      initialValue={dateEnded}
      onChange={(date) => setValue('dateEnded',  date ?? undefined)}
    />    

    <FormLabel>
      Выберите группу (необязательно)
    </FormLabel>

    <Select 
      isClearable
      getOptionLabel={opt => opt.name}
      getOptionValue={opt => opt.name}
      placeholder={'Выберите группу'}
      options={sections}
      onChange={(option) => {
        return setValue('section', option ?? undefined, {shouldValidate: true})
      }
      }
      
    />

    <Button 
        isLoading={isLoading} 
        mt={5}
        type='submit'
    >
      Изменить
    </Button>

    <CloseButton
      size="sm"
      position="absolute"
      right={2}
      top={10}
      onClick={() => {
        onCloseButtonClick()
      }}
    />
</FormControl>
    </form>
   
  )
}

export default EditFormTodo