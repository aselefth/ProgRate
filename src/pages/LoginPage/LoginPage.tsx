import Button from "../../components/Button/Button"
import { useAppDispatch } from "../../hooks/redux"
import styles from "./LoginPage.module.scss"
import { useLoginMutation } from "../../store/Api/authApiSlice"
import { setCredentials } from "../../store/Slices/authSlice"
import { IUserLogin } from "../../types/types"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage: FC = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useAppDispatch()
    const [auth] = useLoginMutation()
    const router = useNavigate()

    async function handleAuth(user: IUserLogin) {
        try {
            const res = await auth({
                userName: user.userName,
                password: user.password,
            }).unwrap()
            if (res.token) {
                localStorage.setItem("token", res.token)
                dispatch(setCredentials({ token: res.token, isLogged: true }))
                router("/")
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form
            className={styles.loginForm}
            onSubmit={(e) => {
                e.preventDefault()
                handleAuth({ userName, password })
            }}
        >
            <input
                type="text"
                placeholder="your nickname..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                type="text"
                placeholder="password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.buttons}>
                <Button fontSize="1.5rem" type="submit">
                    login
                </Button>
                <Button
                    fontSize="1.5rem"
                    onclick={() => {
                        router("/register")
                    }}
                >
                    no account?
                </Button>
            </div>
        </form>
    )
}

export default LoginPage
