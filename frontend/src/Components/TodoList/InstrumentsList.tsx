import { Button, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useState } from 'react'

type Props = {
    onDelete: () => void
}



export function   InstrumentsList({onDelete}: Props)  {
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const onDeleteHandler = () => {
     setIsDeleting(true)
     onDelete()
  }

  return (
    <Wrap>
        <WrapItem>
            <Button 
                colorScheme='red'
                isLoading={isDeleting}
                onClick={onDeleteHandler}
                
            
            >
                 Удалить 
            </Button>
    </WrapItem>
    <WrapItem>
      <Button colorScheme='yellow'>
          Редактировать 
      </Button>
    </WrapItem>
    <WrapItem>
      <Button 
          colorScheme='green'
          onClick={() => {
            // dispatch(completeTodo(selectedId))
          }}
      >
          Завершить 
      </Button>
    </WrapItem>
    
  </Wrap>
  )
}