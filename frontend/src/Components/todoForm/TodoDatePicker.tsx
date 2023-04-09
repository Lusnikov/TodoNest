import React, { useState } from 'react'
import InputMask from 'react-input-mask';
import DatePicker from "react-datepicker";
import { Input } from '@chakra-ui/react';
import { formatDate } from '@/utils/helpers';

type Props = {
    onChange: (date: Date|null ) => void,
    initialValue: Date| null,
}


const TodoDatePicker = (props: Props) => {
  const {
    onChange,
    initialValue
  } = props


  return (
     <DatePicker
        isClearable 
        selected={initialValue}
        dateFormat="dd-MM-yyyy"
        customInput={
        <InputMask mask="99/99/9999" placeholder="ДД/ММ/ГГГГ"   >
            <Input isInvalid={false}/>
        </InputMask>
        }
        onChange={(date, ed) => { 
        let resultDate = date;
        if (!ed) return
        if (!date) resultDate = null
        if (ed.type === 'change' && date) resultDate = new Date(formatDate(date)) 
        onChange(resultDate)
        
        }} 
           
    />
  )
}

export default TodoDatePicker