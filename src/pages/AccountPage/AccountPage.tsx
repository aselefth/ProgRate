import styles from "./AccountPage.module.scss"
import ButtonLink from "../../components/ButtonLink/ButtonLink"
import Button from "../../components/Button/Button"
import { useGetUserQuery } from "../../store/Api/userApislice"
import { useAppDispatch } from "../../hooks/redux"
import { setCredentials } from "../../store/Slices/authSlice"
import { useNavigate } from "react-router-dom"
import { FC } from "react"

const AccountPage: FC = () => {
    const { data: user } = useGetUserQuery(undefined)
    const dispatch = useAppDispatch()
    const router = useNavigate()
    console.log(user);
    

    const logout = () => {
        localStorage.removeItem("token")
        dispatch(setCredentials({ token: null, isLogged: false }))
        router("/login")
    }

    return (
        <div className={styles.accountPageWrapper}>
            <div className={styles.hero}>
                <h1>
                    <span>@{user?.userName}'s</span> page
                </h1>
            </div>
            <div className={styles.postsLink}>
                <ButtonLink
                    route={`users/${user?.userName}/posts`}
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
                                <Button fontSize="1.5rem">change</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td>{user?.email}</td>
                            <td>
                                <Button fontSize="1.5rem">change</Button>
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
    )
}

export default AccountPage
