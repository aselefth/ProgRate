import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import ButtonLink from '../../components/ButtonLink/ButtonLink'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
    useChangeUserMutation,
    useGetUserQuery,
} from '../../store/Api/userApislice'
import { setCredentials } from '../../store/Slices/authSlice'
import { setUpdatePostDto } from '../../store/Slices/InterfaceSlice'
import { IUserUpdate } from '../../types/types'
import styles from './UpdateUserPage.module.scss'

export default function UpdateUserPage() {
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const { data: user } = useGetUserQuery(undefined, { skip: !isLogged })
    const [changeUser] = useChangeUserMutation()
    const [userName, setUserName] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const router = useNavigate()

    useEffect(() => {
        setUserName(String(user?.userName))
        setFullName(String(user?.fullName))
        setEmail(String(user?.email))
        setAvatar(String(user?.pictureBase))
    }, [user])

    async function handleUpdateUser(userUpdate: IUserUpdate) {
        try {
            await changeUser(userUpdate)
        } catch (e) {
            console.log(e)
        }
    }

    async function handleSetAvatar(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files && e.target.files[0]
        console.log(file)

        const base64 = file && (await convertBase64(file))
        setAvatar(base64)
    }

    function convertBase64(file: File) {
        return new Promise((res, rej) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                res(fileReader.result)
            }

            fileReader.onerror = (err) => {
                rej(err)
            }
        })
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
                        <tr>
                            <td>email</td>
                            <td>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>avatar</td>
                            <td>
                                <input type="file" onChange={handleSetAvatar} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex gap-4">
                <Button fontSize="1.5rem" onclick={() => router('/account')}>
                    quit
                </Button>
                <Button
                    fontSize="1.5rem"
                    onclick={() => {
                        if (
                            userName &&
                            userName.length > 5 &&
                            fullName &&
                            fullName.length > 5
                        ) {
                            handleUpdateUser({
                                userName,
                                fullName,
                                email,
                                pictureBase: avatar ? avatar : null,
                            })
                            router('/account')
                        }
                    }}
                >
                    save
                </Button>
            </div>
        </div>
    )
}
