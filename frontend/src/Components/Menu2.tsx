import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { FaChevronDown } from 'react-icons/fa'

type Props = {}

const Menu2 = (props: Props) => {
  return (
    <Flex>
      <Menu>
        <MenuButton as={Button} rightIcon={<FaChevronDown />}>
          Действия
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Link href="/createTodo">Создать todo</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/groupControl">
              Создать группу
            </Link>
          </MenuItem> 
        </MenuList>
      </Menu>
          </Flex>
  )
}

export default Menu2