import React from 'react'
import { Box, Button, Flex, Heading, IconButton, Stack, Text, Theme, useColorMode } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { CustomTheme } from '@/pages/_app'
import { FaSun, FaMoon } from "react-icons/fa";
import { useAppSelector } from '@/store/storeHooks';
import type { RootState } from '@/store/store';
import Link from 'next/link';
import { useDrop } from 'react-dnd';
type Props = {}

const Header = (props: Props) => {
  const {colorMode, toggleColorMode} = useColorMode()
  const theme = useTheme() as Theme & CustomTheme
  const bgColor = theme.header[colorMode]
  const p = useAppSelector((e: RootState) => e.user)

  return (
    <>
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg={bgColor}
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Link href="/">
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          MToDo!
        </Heading>
        </Link>
     
      </Flex>

      <Box display={{ base: "block", md: "none" }} >

      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Link href={'/manageTodo'}>123</Link>
        <Text>О</Text>
        <Text>Examples</Text>
        <Text>Blog</Text>
      </Stack>

      <Box
        mt={{ base: 4, md: 0 }}
      >
           <IconButton
           mr={2}
            _hover={{color: 'red'}}
            aria-label="Toggle theme"
            bg={bgColor}
            icon={colorMode === "light" ? <FaMoon fontSize={'24px'}/> : <FaSun  fontSize={'24px'} />}
            onClick={toggleColorMode}
          
          />  
        <Link
        href={'/registration'}
        >
          Create account
        </Link>
      </Box>
    </Flex>
    </>
    
  )
}

export default Header