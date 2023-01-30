import { Dispatch, SetStateAction, useEffect } from 'react'
import styles from './Error.module.scss'

export interface ErrorProps {
    isError: boolean
    setIsError: Dispatch<SetStateAction<boolean>>
}

export default function Error({isError, setIsError}: ErrorProps) {

    useEffect(() => {
        const timer = isError
            ? setTimeout(() => {
                  setIsError(false)
              }, 2500)
            : null

        return () => {
            timer && clearTimeout(timer)
        }
    }, [isError])

    return (
        <div
            className={`${styles.error} ${
                isError
                    ? styles.errorOpened
                    : styles.errorClosed
            }`}
        >
            Something went wrong...
        </div>
    )
}
