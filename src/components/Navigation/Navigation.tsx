import { Link } from 'react-router-dom'
import { FC, useEffect } from 'react'
import laptop from '../../assets/laptop.svg'
import Search from '../Search/Search'
import styles from './Navigation.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { setCredentials } from '../../store/Slices/authSlice'
import { changeSearch } from '../../store/Slices/InterfaceSlice'
import { useGetUserQuery } from '../../store/Api/userApislice'
import ButtonLink from '../ButtonLink/ButtonLink'
import { useGetFriendRequestsQuery } from '../../store/Api/friendsApiSlice'

export const Navigation: FC = () => {
    const router = useNavigate()
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const dispatch = useAppDispatch()
    const { data: user } = useGetUserQuery(undefined, {
        skip: !isLogged
    })
    const {data: requests} = useGetFriendRequestsQuery(undefined, {skip: !isLogged})
    console.log(requests);
    

    useEffect(() => {
        const token = localStorage.getItem('token')
        dispatch(setCredentials({ token, isLogged: token ? true : false }))
    }, [])

    return (
        <nav className={styles.navBar}>
            <div className={styles.navContainer}>
                <Link to="/" onClick={() => dispatch(changeSearch(''))}>
                    <img
                        src={laptop}
                        alt="logo"
                        width="42"
                        className="cursor-pointer"
                    />
                </Link>
                <Search />
                {user ? (
                    <div className="flex gap-2">
                        <ButtonLink
                            route={`account/friends`}
                            fontSize="1.5rem"
                        >
                            <span>friends</span>
                            { requests && requests.length !== 0 && (
                                <p
                                    style={{ background: 'var(--buttonGray)' }}
                                    className="rounded px-2"
                                >
                                    !
                                </p>
                            )}
                        </ButtonLink>
                        <Button
                            onclick={() => {
                                router('/account')
                                dispatch(changeSearch(''))
                            }}
                            fontSize="1.5rem"
                        >
                            account
                        </Button>
                    </div>
                ) : (
                    <Button
                        onclick={() => {
                            router('/login')
                            dispatch(changeSearch(''))
                        }}
                        fontSize="1.5rem"
                    >
                        login
                    </Button>
                )}
            </div>
        </nav>
    )
}

export default Navigation
