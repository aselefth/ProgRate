import { Link } from "react-router-dom"
import { FC, useEffect } from "react"
import laptop from "../../assets/laptop.svg"
import Search from "../Search/Search"
import styles from "./Navigation.module.scss"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import Button from "../Button/Button"
import { useNavigate } from "react-router-dom"
import { setCredentials } from "../../store/Slices/authSlice"

export const Navigation: FC = () => {
    const router = useNavigate()
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const dispatch = useAppDispatch()
    

    useEffect(() => {
        const token = localStorage.getItem("token")
        dispatch(setCredentials({ token, isLogged: token ? true : false }))
    }, [])

    return (
        <nav className={styles.navBar}>
            <div className={styles.navContainer}>
                <Link to="/">
                    <img
                        src={laptop}
                        alt="logo"
                        width="42"
                        className="cursor-pointer"
                    />
                </Link>
                <Search />
                {isLogged ? (
                    <Button onclick={() => router("/account")} fontSize='1.5rem'>account</Button>
                ) : (
                    <Button onclick={() => router("/login")} fontSize='1.5rem'>login</Button>
                )}
            </div>
        </nav>
    )
}

export default Navigation
