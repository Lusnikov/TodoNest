import React, { useState } from 'react'
import { Box, Text, IconButton, Checkbox, Heading, Container, HStack, Tag,  } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { Section } from '@/types/types';
import { useAppDispatch } from '@/store/storeHooks';
import { removeTodo } from '@/store/slice/user.slice';
import { motion } from 'framer-motion';
import { useDrag } from 'react-dnd';


type Props = {
    id: number,
    title: string,
    dateCreated: string,
    content: string,
    dateEnded?: string,
    section?: Section,
    selectCallback: (value: boolean, id: number) => void,
    completed: boolean
}

const MotionBox = motion(Box)

const TodoItem = (props: Props) => {
    const {
        content,
        dateCreated,
        title,
        dateEnded,
        section,
        id,
        selectCallback,
        completed
    } = props
    const dispatch = useAppDispatch()
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [{ isDragging }, drag] = useDrag({
        type: "todo",
        item: { id },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      });
 
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
        <div>{completed ? 'true' : 'false'}</div>
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
                {dateCreated}
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