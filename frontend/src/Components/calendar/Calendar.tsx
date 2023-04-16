import React, { useRef, useState } from 'react'
import s from './index.module.css'
import DatePicker from "react-datepicker";
import { Box, Grid } from '@chakra-ui/react'
import "react-datepicker/dist/react-datepicker.css";
import { OnChangeDatePayload, Todos } from '@/types/types';
import { List } from '../List';
import { dateEquals, setDefaultTime } from '@/utils/helpers';

type Props = {
    items: Todos[],
    onChangeDate: OnChangeDatePayload
}

const DAYSSHOWED = Array.from(Array(7).keys())

const isItemData = (data: unknown): data is Todos => {
    if (typeof data !== 'object' || data === null ) return false
    if ('dateEnded' in data){
        return true
    }
    return  false
}

const Calendar = (props: Props) => {
  const { onChangeDate } = props
  const [date, setDate] = useState<Date| null>(new Date())

  const getTodosHandler = (date: Date) => {
    return (e:Todos) => {
        if ( !e.dateEnded ) return <></>
        if (dateEquals(date, e.dateEnded))  return <CalendarTodo  elem={e}/>
        return <></>
    }
  }

 
  return (
    <>
        <Box>
            <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
            />    
        </Box>
       <Grid className={s.grid}>
        <div className={s.content} onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const container = e.currentTarget;
                    const containerRect = container.getBoundingClientRect();
                    const containerHeight = container.offsetWidth;
                    const mouseX = e.clientX - containerRect.left;
                    
                    if (mouseX < 30 ) {
                        container.scrollLeft -= 2;
                    } else if (mouseX > containerHeight - 30) {
                        container.scrollLeft += 2;
                    }
            }}
            >
            {DAYSSHOWED.map((e, index) =>  {
                if (!date) return
                const second = new Date(date)
                const  D = new Date(second.setDate(date.getDate() + index))
          
                return <div className={s.gridElement}
                >
                {D.toLocaleString('ru-Ru',  {
                    weekday: 'long',
                    day: "numeric",
                    month: "short"
                })} 
             </div>
            })}

            {DAYSSHOWED.map((_, index) =>  {
                if (!date) return
                const second = new Date(date)
                const  D = new Date(second.setDate(date.getDate() + index))
           
                return <ContentItem onChangeDate={onChangeDate} className={s.gridElementTodo} dateValue={D}>
                    <>
                        <List
                            elements={props.items}
                            renderItem={getTodosHandler(D)}
                        />
                    </>
                </ContentItem>
            })}


        </div>
    </Grid>
    </>
 
  )
}

type ContentItemProps = {
    children: React.ReactElement,
    className?: string,
    dateValue: Date,
    onChangeDate: OnChangeDatePayload
}

const ContentItem = (props:ContentItemProps) => {
    const { className='', dateValue, onChangeDate } = props
    const [isOver, setIsOver] = useState(false)
    return <div 
        style={{background: isOver ? 'red' : undefined}}
        className={[s.gridElement, className].join(' ')}
        onDragOver={(e) => {
            e.preventDefault()
            setIsOver(true)
        }}
        onDragEnter={(e) =>{
            setIsOver(true)
        }}
    
        onDragLeave={(e) => {
            setIsOver(false)
        }}
        onDrop={(e) => {
            setIsOver(false)
            const data = JSON.parse(e.dataTransfer.getData("todoTransfer"))
            if (isItemData(data)){
                if (!data?.dateEnded) return 
                const newDate = new Date(data.dateEnded)
                const newItemDate = setDefaultTime(dateValue, newDate)
                onChangeDate(data.id, newItemDate)
            }
            return
        }}
    >
      {props.children}
    </div>
}


type CalendarTodoProps = {
    elem: Todos,
    className?: string,

}

const CalendarTodo = ({elem, className=''}: CalendarTodoProps) => {
    return <div 
        className={className}
        onDragStart={(e) => {
            e.dataTransfer.setData('todoTransfer', JSON.stringify(elem))
        }}
        draggable
    >
       {elem.title}
    </div>
}

export default Calendar