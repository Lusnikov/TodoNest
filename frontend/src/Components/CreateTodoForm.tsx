import { addTodo } from '@/store/slice/user.slice'
import { useAppDispatch, useAppSelector } from '@/store/storeHooks'
import { Section } from '@/types/types'
import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputLeftAddon, InputLeftElement, Textarea, useDisclosure } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import InputMask from 'react-input-mask';
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';


type Props = {}

function formatDate(date:Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const CreateTodoForm = (props: Props) => {
  const [group, setGroup]  = useState<Section>()
  const [isCreated, setIsCreate] = useState<boolean>(false)
  const [isDirty, setIsDirty] = useState<boolean>(false)

  const [todoName, setTodoName] = useState<string>('')
  const [todoError, setTodoError] = useState<string>('')
 
  const [todoContent, setTodoContent] = useState<string>('')
  const [contentError, setContentError] = useState<string>('')

  const [date, setDate] = useState<any>(null)
  const [time, setTime] = useState<any>('23:59')

  const dispatch = useAppDispatch()
  const sections = useAppSelector(e => e.user?.sections as Section[])

  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value)
    if (e.target.value === ''){
      return setTodoError('Поле пустое')
    }
    setTodoError('')
  }

  const textareaOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodoContent(e.target.value)
    if (e.target.value === ''){
      console.warn(!valid)
      return setContentError('Поле пустое')
    }
    setContentError('')
  }

  const createTodo =  () => {
    setIsCreate(true)
    dispatch(addTodo({
      content: todoContent,
      title: todoName,
      section: group,
      date: date ?? undefined,
      time: time ?? undefined
    })).finally(() => {
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


          <DatePicker 
              isClearable selected={date}
              value={date}
              dateFormat="dd-MM-yyyy"
              showFourColumnMonthYearPicker
              customInput={
                <InputMask mask="99/99/9999" placeholder="ДД/ММ/ГГГГ"   >
                    <Input isInvalid={false}/>
                </InputMask>
            }
              onChange={(date, ed) => { 
                if (ed && date){
                  if (ed.type === 'change'){
                    const dae = new Date(formatDate(date))
                    console.warn(dae)
                    return setDate(dae)
                    // return     setDate() 
                  }
                }
                
                setDate(date)
              }} 
           
          />

    
        {date && <>
          <TimePicker
            value={time ?? "23:59"}
            disableClock
            onChange={e => setTime(e)}
          />
        </>}
        <FormLabel>
          Выберите группу (необязательно)
        </FormLabel>
        <Select 
          getOptionLabel={opt => opt.name}
          getOptionValue={opt => opt.name}
          placeholder={'Выберите группу'}
          onChange={e => {
            console.log(e)
           setGroup(e as Section)
          }}
          options={sections}
        />

        <Button 
            isLoading={isCreated} 
            isDisabled={submitDisabled} mt={5}
            onClick={createTodo}
        >
            Создать
        </Button>

    

    </FormControl>
  )
}

export default CreateTodoForm