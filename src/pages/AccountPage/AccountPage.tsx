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
                <div className={styles.avatarWrapper}>
                    <img
                        src={user?.pictureBase}
                    />
                </div>
            ) : (
                <div className={styles.avatarWrapper}></div>
            )}
            <div className="flex flex-col items-center gap-4 bg-white p-4 rounded-lg">
                <div className={styles.hero}>
                    <h1>
                        страница <span>@{user?.userName}</span>
                    </h1>
                </div>
                <div className={styles.postsLink}>
                    <ButtonLink
                        route={`users/${user?.userId}/posts`}
                        fontSize="1.25rem"
                    >
                        мои посты
                    </ButtonLink>
                </div>
                <div className={styles.info}>
                    <table>
                        <tbody>
                            <tr>
                                <td>имя</td>
                                <td>{user?.fullName}</td>
                                <td>
                                    <ButtonLink route="account/change" fontSize='1.25rem'>
                                        изменить
                                    </ButtonLink>
                                </td>
                            </tr>
                            <tr>
                                <td>email</td>
                                <td>{user?.email}</td>
                                <td>
                                    <ButtonLink route="account/change" fontSize='1.25rem'>
                                        изменить
                                    </ButtonLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Button
                    fontSize="1.25rem"
                    onclick={() => {
                        logout()
                    }}
                >
                    выйти
                </Button>
            </div>
        </div>
    )
}

export default AccountPage
