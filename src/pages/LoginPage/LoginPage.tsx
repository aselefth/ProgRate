import Button from "../../components/Button/Button"
import { useAppDispatch } from "../../hooks/redux"
import styles from "./LoginPage.module.scss"
import { useLoginMutation } from "../../store/Api/authApiSlice"
import { setCredentials } from "../../store/Slices/authSlice"
import { IUserLogin } from "../../types/types"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLogin } from "../../hooks/useLogin"
import { loginValidation } from "../../services/validation"
import Error from "../../components/Error/Error"

const LoginPage: FC = () => {
    const router = useNavigate()
    const [isValidationError, setIsValidationError] = useState(false)

    const {
        userName,
        password,
        handleAuth,
        handleChangeLogin,
        handleChangePassword,
    } = useLogin()

    return (
        <form
            className={styles.loginForm}
            onSubmit={(e) => {
                e.preventDefault()
                if (loginValidation({ userName, password })) {
                    handleAuth({ userName, password })
                } else {
                    setIsValidationError(true)
                }
            }}
        >
            <Error
                isError={isValidationError}
                setIsError={setIsValidationError}
            />
            <input
                type="text"
                placeholder="your nickname..."
                value={userName}
                onChange={handleChangeLogin}
            />
            <input
                type="text"
                placeholder="password..."
                value={password}
                onChange={handleChangePassword}
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
