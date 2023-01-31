import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button/Button"
import ButtonLink from "../../components/ButtonLink/ButtonLink"
import { useAppDispatch } from "../../hooks/redux"
import {
    useChangeUserMutation,
    useGetUserQuery,
} from "../../store/Api/userApislice"
import { setCredentials } from "../../store/Slices/authSlice"
import { IUserUpdate } from "../../types/types"
import styles from "./UpdateUserPage.module.scss"

export default function UpdateUserPage() {
    const { data: user } = useGetUserQuery(undefined)
    
    const [changeUser] = useChangeUserMutation()
    const [userName, setUserName] = useState('')
    const [fullName, setFullName] = useState('')
    const dispatch = useAppDispatch()
    const router = useNavigate()

    useEffect(() => {
        setUserName(String(user?.userName))
        setFullName(String(user?.fullName))
    }, [user])

    async function handleUpdateUser(userUpdate: IUserUpdate) {
        try {
            await changeUser(userUpdate)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.accountPageWrapper}>
            <div className={styles.hero}>
                <h1>
                    <span>@{user?.userName}'s</span> page
                </h1>
            </div>
            <div className={styles.info}>
                <table>
                    <tbody>
                        <tr>
                            <td>full name</td>
                            <td>
                                <input
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>username</td>
                            <td>
                                <input
                                    value={userName}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex gap-4">
                <Button fontSize="1.5rem" onclick={() => router('/account')}>quit</Button>
                <Button
                    fontSize="1.5rem"
                    onclick={() => {
                        if (
                            userName &&
                            userName.length > 5 &&
                            fullName &&
                            fullName.length > 5
                        ) {
                            handleUpdateUser({ userName, fullName})
                            router("/account")
                        }
                    }}
                >
                    save
                </Button>
            </div>
        </div>
    )
}
