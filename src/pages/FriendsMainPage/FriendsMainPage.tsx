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
                <div
                    className={`${styles.selector} ${
                        selector === 'left'
                            ? styles.selectorLeft
                            : styles.selectorRight
                    }`}
                ></div>
                <p
                    onClick={() => {
                        setSelector('left')
                        router('/account/friends')
                    }}
                >
                    friends list
                </p>
                <p
                    onClick={() => {
                        setSelector('right')
                        router('/account/friends/requests')
                    }}
                >
                    requests list
                </p>
            </div>
            <Outlet />
        </div>
    )
}
