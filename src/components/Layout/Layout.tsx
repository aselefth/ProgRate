import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import AddWidget from '../AddWidget/AddWidget'
import CreatePostModal from '../CreatePostModal/CreatePostModal'
import LeftSide from '../LeftSide/LeftSide'
import Loader from '../Loader/Loader'
import Navigation from '../Navigation/Navigation'
import UpdatePostModal from '../UpdatePostModal/UpdatePostModal'
import styles from './Layout.module.scss'

const Layout: FC = () => {
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const post = useAppSelector((state) => state.InterfaceSlice.updatePostDto)

    return (
        <div className='flex mx-auto max-w-[1100px] mt-20 mb-24 justify-between relative'>
            <Loader />
            <Navigation />
            <LeftSide />
            <main className={`${styles.main}`}>
                <Outlet />
            </main>
            {/* {isLogged && <AddWidget />} */}
            {/* <CreatePostModal />
            <UpdatePostModal post={post} />  */}
        </div>
    )
}

export default Layout
