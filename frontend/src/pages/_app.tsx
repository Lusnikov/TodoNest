import { store } from '@/store/store';
import { Alert, ChakraProvider, ColorModeScript, extendTheme, Theme, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import {DndProvider} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppSelector } from '@/store/storeHooks';
import { NextComponentType, NextPageContext } from 'next';
import '../styles/globals.css'

export interface CustomTheme {
  header: {
    dark: "black",
    light: string
  }
}

const theme: CustomTheme = {
  header: {
    dark: "black",
    light: "teal.700"
  }
};

const extendedTheme = extendTheme(theme)


const MyApp = (props: {Component:NextComponentType<NextPageContext, any, any>, pageProps: any}) => {
  const {Component, pageProps}= props
  return <>
        {/* <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Your browser is outdated!</AlertTitle>
            <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
        </Alert> */}
        <Component {...pageProps} />
  </> 
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={extendedTheme}>
        <ColorModeScript initialColorMode={extendedTheme.config.initialColorMode} />
        <DndProvider backend={HTML5Backend}>
        <MyApp Component={Component} pageProps={pageProps}/>

        </DndProvider>
      </ChakraProvider>
    </Provider>

  )
}
