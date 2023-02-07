import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux'
import { logOut } from '../../store/Slices/authSlice'
import Button from '../Button/Button'

export default function LeftSide() {
    const router = useNavigate()
    const dispatch = useAppDispatch()

    const logout = () => {
        localStorage.removeItem('token')
        dispatch(logOut())
        router('/login')
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center gap-4 w-40 bg-white p-2 rounded-lg">
                <Button
                    fontSize="1.5rem"
                    width="100%"
                    onclick={() => router('/account')}
                >
                    account
                </Button>
            </div>

            <div className="flex flex-col items-center gap-4 w-40 bg-white p-2 rounded-lg">
                <Button
                    fontSize="1.5rem"
                    width="100%"
                    onclick={() => router('/')}
                >
                    feed
                </Button>
                <Button
                    fontSize="1.5rem"
                    width="100%"
                    onclick={() => router('/search')}
                >
                    search
                </Button>
                <Button
                    fontSize="1.5rem"
                    width="100%"
                    onclick={() => router('/account/friends')}
                >
                    friends
                </Button>
                <Button
                    fontSize="1.5rem"
                    width="100%"
                    onclick={() => router('/account/friends/requests')}
                >
                    requests
                </Button>
                <Button
                    fontSize="1.5rem"
                    width="100%"
                    onclick={() => {
                        logout()
                    }}
                >
                    quit
                </Button>
            </div>
        </div>
    )
}
