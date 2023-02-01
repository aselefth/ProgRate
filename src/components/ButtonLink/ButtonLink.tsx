import { Link } from "react-router-dom";
import { FC, ReactNode } from "react";
import styles from "./ButtonLink.module.scss";

export interface ButtonLinkProps {
    route: string;
    children: string | ReactNode;
    width?: string;
    height?: string;
    fontSize?: string;
}

const ButtonLink: FC<ButtonLinkProps> = ({
    route,
    children,
    width,
    fontSize,
    height,
}) => {
    return (
        <span
            className={styles.buttonLink}
            style={{ width, fontSize, height }}
        >
            <Link to={`/${route}`}>{children}</Link>
        </span>
    );
};

export default ButtonLink;
