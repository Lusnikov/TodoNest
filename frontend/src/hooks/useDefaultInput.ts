import { useState } from "react"

type UseDefaultInputReturned = [
    string, 
    string,
    (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => void
]
  
export const useDefaultInput = (): UseDefaultInputReturned => {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const handler = (e:React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        setValue(e.target.value)
        if (e.target.value === '') return setError('Поле пустое')
        setError('')
    }

    return [
        value,
        error,
        handler
    ]

}
