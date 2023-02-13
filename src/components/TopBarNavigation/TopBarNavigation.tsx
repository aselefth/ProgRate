import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { changeSearch } from '../../store/Slices/InterfaceSlice'
import Button from '../Button/Button'

export default function LoginSection() {
    const { isLogged } = useAppSelector((state) => state.authSlice)
    const dispatch = useAppDispatch()
    const router = useNavigate()
    return (
        <>
            {!isLogged &&
                <Button
                    onclick={() => {
                        router('/login')
                        dispatch(changeSearch(''))
                    }}
                    fontSize="1.5rem"
                >
                    <FontAwesomeIcon icon={faRightToBracket} />
                </Button>
            }
        </>
    )
}
