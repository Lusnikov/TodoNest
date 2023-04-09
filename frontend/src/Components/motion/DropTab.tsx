import { setTodoGroup } from '@/store/slice/user.slice';
import { useAppDispatch } from '@/store/storeHooks';
import { Tab } from '@chakra-ui/react';
import React from 'react'
import { useDrop } from 'react-dnd';

type Props = {
    children: string,
    idSection: number,
    isDropable?: boolean
}

const DropTab = (props: Props) => {
    const {isDropable=true} = props
    const dispatch = useAppDispatch()
    
    const [{ isOver }, drop] = useDrop({
        accept: "todo",
        drop: (item: {id: number}) => {
            console.log(item, props.idSection)
            dispatch(setTodoGroup({
              sectionId: props.idSection,
              todoId: item.id
            }))

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