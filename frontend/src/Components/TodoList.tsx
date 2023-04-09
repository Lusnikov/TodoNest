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

const TodoList = () => {
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number[]>([])
  const todos = useAppSelector(state => state.user?.todos as Todos[])
  const sections = [...defaultSections,...useAppSelector(state => state.user?.sections as Section[])]

  const dispatch = useAppDispatch()

 

  const getHandlerByIndex = (index:number) => ({
    0: () => todos.filter(e => !e.completed),
    1: () => todos.filter(e => true) ,
    2: () => {
      return todos.filter(e => e.completed)
    }
    
  }[index] || (() => {
      return todos
      .filter( todo => {
        console.warn(sections[index].id)
        // console.warn(todo?.section?.id === sections[index].id)
        return todo?.section?.id === sections[index].id
      }
      )
  }))
  
  const onChangeCheckbox = (value: boolean, id: number) => {
    if (value) return setSelectedId([...selectedId, id])
    setSelectedId(selectedId.filter(ident => ident !== id ))
  }
  const filteredTodos = getHandlerByIndex(tabIndex)

  return (
    <>
       <Container maxW={'1280px'} display="flex" flexDirection="column" gap="30px">
        <Tabs
          onChange={(index) => {
            setTabIndex(index)
            setSelectedId([])
          }}
        >
          <TabList >
            {sections
            .map((section, index) => (
              <DropTab
                key={`Todo${section.id}`}
                isDropable={index >= defaultSections.length }
              >
                {section.name}
              </DropTab>
            ))
            }
          </TabList>
        </Tabs>
          <Menu2 />

        {
          selectedId.length > 0 && 
          <Wrap>
            <WrapItem>
              <Button 
                colorScheme='red'
                isLoading={isDeleting}
                onClick={e => {
                  setIsDeleting(true)
                  dispatch(removeTodo(selectedId)).finally(() => {
                    setIsDeleting(false)
                    setSelectedId([])
                  })
                }}
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
                    dispatch(completeTodo(selectedId))
                  }}
              >
                  Завершить 
              </Button>
            </WrapItem>
            
          </Wrap>
        }
       
       <AnimatePresence mode='wait'> 
        { filteredTodos()
          .map(todo =>
         
           <TodoItem 
              completed={todo.completed}
              selectCallback={onChangeCheckbox}
              id={todo.id}
              key={`TodoItem${todo.id}$`}
              content={todo.content}
              dateCreated={todo.dateCreated}
              title={todo.title}
              dateEnded={todo.dateEnded ?? undefined}
              section={todo.section}


            />
          )}
       </AnimatePresence>
          
        
            
       </Container>
    </>
  )
}

export default TodoList