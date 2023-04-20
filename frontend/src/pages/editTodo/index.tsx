import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import EditFormTodo from '@/Components/editTodo/editTodoForm';
import Container from '@/Components/Container';
import { useAppSelector } from '@/store/storeHooks';
import { Section, Todos } from '@/types/types';
import { List } from '@/Components/List';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Header from '@/Components/Header';


type Props = {
  id: number | number[]
}

const notContainsNull  = <T,>(arr: (T| null)[]): arr is T[] => {
  const arrayHasNull = arr.findIndex(e => e === null)
  if (arrayHasNull !== -1) return false
  return true
}
const foo = <T,>(x: T) => x;

const isNumberArray = (elem: unknown): elem is number[] => {
  if (Array.isArray(elem)) {
    const res = elem.every(e =>  Number.isFinite(Number(e)))
    return res ? true : false
  }  
  return false
}

const P = (props: Props) => {
  const [isLoading, setIsLoading]  = useState<boolean>(false)
  const todosR = useAppSelector(state => state.user?.todos as Todos[])
  const sections = useAppSelector(state => state.user?.sections as Section[])
  const id  = props.id;
  const todos = Array.isArray(id)
      ? todosR.filter(e => id.includes(e.id))
      : todosR.find(e => e.id === +id)

  if (!todos ) {
    return 'не найедно'
  }

  const router = useRouter()
  const todosIsArray = Array.isArray(todos)

  const [formState, setFormState] = useState<Array<Todos|null>>(() => {
    return Array.isArray(todos) 
      ? [...todos]
      : [{...todos}]
  })

  const handlerSubmit = async (data: Todos) => {
    if (!notContainsNull(formState)) return
    setIsLoading(true)
    // console.log(formState, data)

  }

  const onDeleteItem = (identificator: number, indexInArr: number) => {
    if (Array.isArray(id)){
      const updatedIdList = id.filter((itemId) => itemId !== identificator);
      setFormState(formState.filter((_, index) => indexInArr !== index))
      router.replace({
        pathname: router.pathname,
        query: { id: updatedIdList },
      });
    }
  }

  return <> 
      <Header/>
   
      <Container>
          <>
            {
            Array.isArray(todos) ?
            <List
              elements={todos}
              renderItem={(e, index) => <EditFormTodo
                isLoading={isLoading}
                onSubmitForm={handlerSubmit}
                key={`editForm${e.id}`}
                todo={e}
                sections={sections}
                onCloseButtonClick={() => {
                  onDeleteItem(e.id ,index)
                }}
                onChangeValid={(data) => {
                  const copy = [...formState]
                  copy[index] = data
                  setFormState(copy)
                }}
                message={formState[index] === null ? 'Заполните корректно': null}
              />}
            /> : <EditFormTodo
            isLoading={isLoading}
            onSubmitForm={handlerSubmit}
            todo={todos}
            sections={sections}
            onCloseButtonClick={() => {
            }}
            onChangeValid={() => {}}
          />
            }
          </>       
      </Container>
      </>
  
}

export const getServerSideProps: GetServerSideProps<Props, ParsedUrlQuery> = async (context: GetServerSidePropsContext<ParsedUrlQuery>): Promise<GetServerSidePropsResult<Props>> => {
  const { query } = context;
  const id = query.id;

  if (isNaN(Number(id)) && !isNumberArray(id)) {
    return   {
      notFound: true,
    };
  } 
  let res:number|number[];
  if (Array.isArray(id)) {
    res = id.map(e => +e)
  } else{
    res = Number(id)
  }

  return {
    props: {
      id:res,
    },
  };
};
export default P