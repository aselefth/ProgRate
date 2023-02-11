import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './FriendsMainPage.module.scss'

export default function FriendsMainPage() {
    const [selector, setSelector] = useState<'left' | 'right'>('left')
    const router = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/account/friends') {
            setSelector('left')
        } else {
            setSelector('right')
        }
    }, [])

    return (
        <div className={styles.friendsMainPageWrapper}>
            <div className={styles.links}>
                <span
                    className={selector === 'left' ? styles.active : ''}
                    onClick={() => {
                        setSelector('left')
                        router('/account/friends')
                    }}
                >
                    friends list
                </span>
                <span
                className={selector === 'right' ? styles.active : ''}
                    onClick={() => {
                        setSelector('right')
                        router('/account/friends/requests')
                    }}
                >
                    requests list
                </span>
            </div>
            <Outlet />
        </div>
    )
}
