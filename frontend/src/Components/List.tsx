import React from 'react'

type Props<T> = {
    elements: T[],
    renderItem: (item:T, index: number) => React.ReactElement
}

interface DefaultObject {
    [key: string]: any
  } 

export const List = <T extends DefaultObject>(props: Props<T>) => {
  const {
    elements,
    renderItem
  } = props
  return (
    <>
      {
        elements.map((item, index) => renderItem(item, index))
      }
    </>
  )
}