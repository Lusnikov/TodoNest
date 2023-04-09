import React from 'react'
import {  Container as Cont } from "@chakra-ui/react";
type Props = {
    children: React.ReactElement | string
}

const Container = (props: Props) => {
  return <>
    <Cont maxW={'1280px'}>
      {props.children}
    </Cont>
  </> 
  
}

export default Container