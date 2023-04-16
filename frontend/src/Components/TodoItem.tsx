import React, { useState } from 'react'
import { Box, Text, IconButton, Checkbox, Heading, Container, HStack, Tag,  } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { Section } from '@/types/types';
import { useAppDispatch } from '@/store/storeHooks';
import { removeTodo } from '@/store/slice/user.slice';
import { motion } from 'framer-motion';
import { DragSourceHookSpec, FactoryOrInstance, useDrag } from 'react-dnd';
import type { Todos } from '@/types/types';

type Props = {
    todoItem: Todos
    selectCallback: (value: boolean, id: number) => void,
}

const MotionBox = motion(Box)

const generateDragging = (id: number): FactoryOrInstance<DragSourceHookSpec<unknown, unknown, unknown>> => {
    return{
        type: "todo",
        item: { id },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
    }
}

const TodoItem = ({selectCallback,...props}: Props) => {
    const {
        content,
        dateCreated,
        title,
        section,
        id,
        completed
    } = props.todoItem
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [, drag] = useDrag(generateDragging(id));
    const dispatch = useAppDispatch()
    
    const deleteHandler = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsDeleting(true)
        dispatch(removeTodo([id]))
    }

   
  return (
        <MotionBox
            ref={drag}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 }  }}
            position='relative'
            borderBottomWidth="1px"
            borderColor="gray.200"
            alignItems="center"
            justifyContent="space-between"
            py={2}
        >  
            {section && 
                <HStack spacing={4}>
                    <Tag size={'md'}  variant='solid' colorScheme='teal'>
                        {section.name}
                    </Tag>
                </HStack>  
            }
                
            <Checkbox
                colorScheme="blue"
                onChange={e => selectCallback(e.target.checked, id)}
                size="lg"
                mr={2}
            >
                <Heading as="h3" fontSize="4xl" >
                    {title}
                </Heading>
            </Checkbox>
            <Text>
                {dateCreated.toLocaleDateString('Ru-ru')}
            </Text>

            <Text>
                {content}
            </Text>

            <IconButton
                onClick={deleteHandler}
                isLoading={isDeleting}
                aria-label="Delete Todo"
                icon={!isDeleting ?<FaTrash fontSize="24px" />: <>lo</>}
                position="absolute"
                top='0'
                right="0"
                variant="ghost"
                size="sm"
            />
        </MotionBox>

       
  )
}

export default TodoItem