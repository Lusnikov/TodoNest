import { Tab } from '@chakra-ui/react';
import React from 'react'
import { useDrop } from 'react-dnd';

type Props = {
    children: string,
    isDropable?: boolean
}

const DropTab = (props: Props) => {
    const {isDropable=true} = props
    const [{ isOver }, drop] = useDrop({
        accept: "todo",
        drop: (item) => {
            console.log(item)
          },
          collect: (monitor) => ({
            isOver: !!monitor.isOver(),
          }),
      });
      
  return (
    <Tab
    ref={isDropable ? drop : undefined}
    style={{color: isOver ? 'red' : ''}}
    >{props.children}</Tab>
  )
}

export default DropTab