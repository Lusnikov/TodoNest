import React, { useState } from 'react'
import TodoItem from './TodoItem'
import { Box, Button, Container, Flex, Menu, Tab, TabList, TabPanel, TabPanels, Tabs, Wrap, WrapItem } from "@chakra-ui/react";
import { Section, Todos, UserInterface } from '@/types/types';
import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import { completeTodo, removeTodo } from '@/store/slice/user.slice';
import { AnimatePresence } from 'framer-motion';
import Menu2 from './Menu2';
import { useDrop } from 'react-dnd';
import DropTab from './motion/DropTab';
import { InstrumentsList } from './TodoList/InstrumentsList';
import { List } from './List';
import { useRouter } from 'next/router';


const defaultSections = [
  {
    id: 0,
    name: 'Активные'
  },
  {
    id: -1,
    name: 'Опоздание '
  },
  {
    id: -2,
    name: 'Завершенные '
  }, 
]

type Props = {
}

const TodoList = ({}: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [selectedId, setSelectedId] = useState<number[]>([])
  const todos = useAppSelector(state => state.user?.todos as Todos[])
  const sections = [...defaultSections,...useAppSelector(state => state.user?.sections as Section[])]

  const dispatch = useAppDispatch()
  const router = useRouter()

  const getHandlerByIndex = (index:number) => ({
    0: () => todos.filter(e => !e.completed),
    1: () => todos.filter(e => true) ,
    2: () => todos.filter(e => e.completed) 
  }[index] || ( () => todos.filter( todo =>  todo?.section?.id === sections[index].id))
  )

  const tabChangeHandler = (index:number) => {
      setTabIndex(index)
      setSelectedId([])
  }

  const onChangeCheckbox = (value: boolean, id: number) => {
    if (value) return setSelectedId([...selectedId, id])
    setSelectedId(selectedId.filter(ident => ident !== id ))
  }
  const filteredTodos = getHandlerByIndex(tabIndex)

  return (
    <>
       <Container maxW={'1280px'} display="flex" flexDirection="column" gap="30px">
          <Tabs onChange={tabChangeHandler}>
            <TabList >
              <List 
                elements={sections} 
                renderItem={({id, name}, index) => 
                  <DropTab
                    idSection={id}
                    key={`Tab${id}`}
                    isDropable={index >= defaultSections.length }
                  >
                      {name}
                  </DropTab>
                }
              />
            </TabList>
          </Tabs>

          <Menu2 />
          {
              selectedId.length > 0 && 
                <InstrumentsList
                  onEdit={() => {
                    router.push({
                      pathname: '/editTodo',
                      query: {id: selectedId },
                    
                    })
                
                  }}
                  onDelete={() =>  dispatch(removeTodo(selectedId))
                    .finally(() => setSelectedId([]))
                  }
               />
          // <Wrap>
          //   <WrapItem>
          //     <Button 
          //       colorScheme='red'
          //       isLoading={isDeleting}
          //       onClick={e => {
          //         setIsDeleting(true)
          //         dispatch(removeTodo(selectedId)).finally(() => {
          //           setIsDeleting(false)
          //           setSelectedId([])
          //         })
          //       }}
          //     >
          //         Удалить 
          //     </Button>
          //   </WrapItem>
          //   <WrapItem>
          //     <Button colorScheme='yellow'>
          //         Редактировать 
          //     </Button>
          //   </WrapItem>
          //   <WrapItem>
          //     <Button 
          //         colorScheme='green'
          //         onClick={() => {
          //           dispatch(completeTodo(selectedId))
          //         }}
          //     >
          //         Завершить 
          //     </Button>
          //   </WrapItem>
            
          // </Wrap>
        }
       
       <AnimatePresence mode='wait'> 
          <List
              elements={filteredTodos()}
              renderItem={todo =>   <TodoItem 
                selectCallback={onChangeCheckbox}
                key={`TodoItem${todo.id}$`}
                todoItem={todo}
              />
            }
          />
       </AnimatePresence>
          
        
            
       </Container>
    </>
  )
}

export default TodoList