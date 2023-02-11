import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUserGroup,
    faHandshake,
    faNewspaper,
    faFileImport,
    faRightFromBracket,
    faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { logOut } from '../../store/Slices/authSlice'
import { useEffect, useState } from 'react'
import styles from './LeftSide.module.scss'

type TabsType = 'feed' | 'account' | 'new post' | 'friends' | 'requests'

export default function LeftSide() {
    const { isLogged } = useAppSelector((state) => state.authSlice)
    const [currentTab, setCurrentTab] = useState<TabsType>('feed')
    const router = useNavigate()
    const dispatch = useAppDispatch()
    const location = useLocation()

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setCurrentTab('feed')
                break
            case '/account':
                setCurrentTab('account')
                break
            case '/account/friends':
                setCurrentTab('friends')
                break
            case '/account/friends/requests':
                setCurrentTab('requests')
                break
            case '/createPost':
                setCurrentTab('new post')
                break
        }
    }, [location])

    const logout = () => {
        localStorage.removeItem('token')
        dispatch(logOut())
        router('/login')
    }

    return (
        <>
            {isLogged && (
                <div className={styles.sideNavigation}>
                    <div className={styles.sideNavigationSection}>
                        <div
                            className={`${styles.sideNavigationElement} ${currentTab === 'account' && styles.activeTab}`}
                            onClick={() => router('/account')}
                        >
                            <FontAwesomeIcon icon={faUser} />
                            <span>аккаунт</span>
                        </div>
                        <div
                            className={`${styles.sideNavigationElement} ${currentTab === 'new post' && styles.activeTab}`}
                            onClick={() => router('/createPost')}
                        >
                            <FontAwesomeIcon icon={faFileImport} />
                            <span>создать пост</span>
                        </div>
                    </div>

                    <div className={styles.sideNavigationSection}>
                        <div
                            className={`${styles.sideNavigationElement} ${currentTab === 'feed' && styles.activeTab}`}
                            onClick={() => router('/')}
                        >
                            <FontAwesomeIcon icon={faNewspaper} />
                            <span>лента</span>
                        </div>
                        <div
                            className={`${styles.sideNavigationElement} ${currentTab === 'friends' && styles.activeTab}`}
                            onClick={() => router('/account/friends')}
                        >
                            <FontAwesomeIcon icon={faUserGroup} />
                            <span>друзья</span>
                        </div>
                        <div
                            className={`${styles.sideNavigationElement} ${currentTab === 'requests' && styles.activeTab}`}
                            onClick={() => router('/account/friends/requests')}
                        >
                            <FontAwesomeIcon icon={faHandshake} />
                            <span>запросы</span>
                        </div>
                        <div
                            className={`${styles.sideNavigationElement}`}
                            onClick={() => {
                                logout()
                            }}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            <span>выйти</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}