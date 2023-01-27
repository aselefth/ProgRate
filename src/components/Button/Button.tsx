import { FC } from "react"
import styles from "./Button.module.scss"

export interface ButtonProps {
    children: string
    width?: string
    height?: string
    fontSize?: string
    onclick?: () => void
    type?: "submit" | "reset" | "button"
}

const Button: FC<ButtonProps> = ({
    children,
    width,
    fontSize,
    height,
    onclick,
    type
}) => {
    return (
        <button
            type={type ? type : 'button'}
            className={styles.button}
            style={{ width, fontSize, height }}
            onClick={() => {
                onclick && onclick()
            }}
        >
            {children}
        </button>
    )
}

export default Button
