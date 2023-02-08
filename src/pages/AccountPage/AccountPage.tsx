import styles from './AccountPage.module.scss'
import ButtonLink from '../../components/ButtonLink/ButtonLink'
import Button from '../../components/Button/Button'
import { useGetUserQuery } from '../../store/Api/userApislice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { logOut } from '../../store/Slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { FC } from 'react'

const AccountPage: FC = () => {
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const { data: user } = useGetUserQuery(undefined, { skip: !isLogged })
    const dispatch = useAppDispatch()
    const router = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        dispatch(logOut())
        router('/login')
    }

    return (
        <div className={styles.accountPageWrapper}>
            {user?.pictureBase ? (
                <div className="flex items-center justify-center p-1 bg-purple-500 rounded-[50%]">
                    <img
                        src={user?.pictureBase}
                        className="w-60 h-60 rounded-[50%] object-cover"
                    />
                </div>
            ) : (
                <span className="w-60 h-60 bg-purple-500 rounded-[50%]"></span>
            )}
            <div className="flex flex-col items-center gap-4 bg-white p-4 rounded-lg">
                <div className={styles.hero}>
                    <h1>
                        <span>@{user?.userName}'s</span> page
                    </h1>
                </div>
                <div className={styles.postsLink}>
                    <ButtonLink
                        route={`users/${user?.userId}/posts`}
                        fontSize="1.5rem"
                    >
                        my posts
                    </ButtonLink>
                </div>
                <div className={styles.info}>
                    <table>
                        <tbody>
                            <tr>
                                <td>full name</td>
                                <td>{user?.fullName}</td>
                                <td>
                                    <ButtonLink route="account/change">
                                        change
                                    </ButtonLink>
                                </td>
                            </tr>
                            <tr>
                                <td>email</td>
                                <td>{user?.email}</td>
                                <td>
                                    <ButtonLink route="account/change">
                                        change
                                    </ButtonLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Button
                    fontSize="1.5rem"
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

export default AccountPage
