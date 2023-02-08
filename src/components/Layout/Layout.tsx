import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import LeftSide from '../LeftSide/LeftSide'
import Loader from '../Loader/Loader'
import Navigation from '../Navigation/Navigation'
import styles from './Layout.module.scss'

const Layout: FC = () => {
    return (
        <div className={styles.layoutWrapper}>
            <Loader />
            <Navigation />
            <LeftSide />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
