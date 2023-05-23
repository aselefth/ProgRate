import { FC, ReactNode } from 'react';
import styles from './Button.module.scss';

export interface ButtonProps {
	children?: string | ReactNode;
	width?: string;
	height?: string;
	fontSize?: string;
	onclick?: () => void;
	type?: 'submit' | 'reset' | 'button';
	mainColor?: '--buttonBlue' | '--buttonGray' | '--error' | '--buttonHovered';
}

function Button({
	children,
	width,
	fontSize,
	height,
	onclick,
	type,
	mainColor,
}: ButtonProps) {
	return (
		<button
			type={type ? type : 'button'}
			className={styles.button}
			style={{ width, fontSize, height, background: `var(${mainColor})` }}
			onClick={() => {
				onclick && onclick();
			}}
		>
			{children}
		</button>
	);
}

export default Button;
