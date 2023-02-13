import {
    faDoorOpen,
    faEnvelope,
    faImage,
    faPassport,
    faSave,
    faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import { useAppSelector } from '../../hooks/redux'
import { useImage } from '../../hooks/useImage'
import {
    useChangeUserMutation,
    useGetUserQuery,
} from '../../store/Api/userApislice'
import { IUserUpdate } from '../../types/types'
import styles from './UpdateUserPage.module.scss'

export default function UpdateUserPage() {
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const { data: user } = useGetUserQuery(undefined, { skip: !isLogged })
    const [changeUser] = useChangeUserMutation()
    const [userName, setUserName] = useState('')
    const [fullName, setFullName] = useState('')
    const { avatar, handleSetAvatar } = useImage()
    const [email, setEmail] = useState('')
    const router = useNavigate()

    useEffect(() => {
        setUserName(String(user?.userName))
        setFullName(String(user?.fullName))
        setEmail(String(user?.email))
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
                            <td>
                                <FontAwesomeIcon icon={faPassport} />
                            </td>
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
                            <td>
                                <FontAwesomeIcon icon={faUser} />
                            </td>
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
                            <td>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </td>
                            <td>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FontAwesomeIcon icon={faImage} />
                            </td>
                            <td>
                                <input type='file' onChange={handleSetAvatar} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='flex gap-4'>
                <Button fontSize='1.25rem' onclick={() => router('/account')}>
                    <FontAwesomeIcon icon={faDoorOpen} />
                </Button>
                <Button
                    fontSize='1.25rem'
                    onclick={() => {
                        
                            handleUpdateUser({
                                userName,
                                fullName,
                                email,
                                pictureBase: avatar ? avatar : null,
                            })
                            router('/account')
                        
                    }}
                >
                    <FontAwesomeIcon icon={faSave} />
                </Button>
            </div>
        </div>
    )
}
