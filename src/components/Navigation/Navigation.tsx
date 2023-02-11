import { Link } from 'react-router-dom'
import { FC } from 'react'
import laptop from '../../assets/laptop.svg'
import Search from '../Search/Search'
import styles from './Navigation.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { changeSearch } from '../../store/Slices/InterfaceSlice'
import LoginSection from '../TopBarNavigation/TopBarNavigation'

export const Navigation: FC = () => {
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const dispatch = useAppDispatch()


    return (
        <nav className={styles.navBar}>
            <div className={styles.navContainer}>
                <Link to="/" onClick={() => dispatch(changeSearch(''))}>
                    <img
                        src={laptop}
                        alt="logo"
                        width="42"
                        className="cursor-pointer"
                    />
                </Link>
                <Search />
                <LoginSection />
            </div>
        </nav>
    )
}

export default Navigation
