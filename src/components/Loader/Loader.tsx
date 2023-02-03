import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { logOut, setCredentials } from '../../store/Slices/authSlice'

export default function Loader() {
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLogged) {
            const token = localStorage.getItem('token')
            if (token) {
                dispatch(setCredentials({ token, isLogged: true }))
            } else {
                dispatch(logOut())
            }
        }
    }, [isLogged])

    return <></>
}
