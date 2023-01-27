import { FC } from "react"
import { Outlet } from "react-router-dom"
import { useAppSelector } from "../../hooks/redux"
import AddWidget from "../AddWidget/AddWidget"
import CreatePostModal from "../CreatePostModal/CreatePostModal"
import Navigation from "../Navigation/Navigation"
import styles from "./Layout.module.scss"


const Layout: FC = () => {
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)

    return (
        <>
            <Navigation />
            <main className={`${styles.main}`}>
                <Outlet />
            </main>
            {isLogged && <AddWidget />}
            <CreatePostModal />
        </>
    )
}

export default Layout
