import { useEffect, useState } from 'react'

export function useDebounce(value: string, delay: number) {
    const [debounce, setDebounce] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebounce(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debounce
}
