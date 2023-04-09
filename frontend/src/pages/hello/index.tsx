import Container from '@/Components/Container'
import Header from '@/Components/Header'
import TodoList from '@/Components/TodoList'
import { RootState } from '@/store/store'
import { useAppSelector } from '@/store/storeHooks'
import Head from 'next/head'




export default function Home() {
  return (
    <>
      <Head>
        <title>Главная</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <Header/>
    <Container>
      Hello
    </Container>

    
    </>
  )
}