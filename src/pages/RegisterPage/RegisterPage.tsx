import { useNavigate } from "react-router-dom"
import { FC, useState } from "react"
import Button from "../../components/Button/Button"
import { useRegisterUserMutation } from "../../store/Api/userApislice"
import { IUserRegister } from "../../types/types"
import styles from "./RegisterPage.module.scss"

const RegisterPage: FC = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [register] = useRegisterUserMutation()
    const router = useNavigate()

    async function handleRegister(user: IUserRegister) {
        try {
            const res = await register(user)
            console.log(res)
            router("/login")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form
            className={styles.loginForm}
            onSubmit={(e) => {
                e.preventDefault()
                handleRegister({ userName, password, email, fullName })
            }}
        >
            <input
                type="text"
                placeholder="your full name..."
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />
            <input
                type="email"
                placeholder="your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="text"
                placeholder="username..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <div className={styles.buttons}>
                <Button fontSize="1.5rem" type="submit">
                    register
                </Button>
                <Button
                    fontSize="1.5rem"
                    onclick={() => router("/login")}
                >
                    have account?
                </Button>
            </div>
        </form>
    )
}

export default RegisterPage
