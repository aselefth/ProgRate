import { useNavigate } from 'react-router-dom';
import { FC, useState } from 'react';
import Button from '../../components/Button/Button';
import { useRegisterUserMutation } from '../../store/Api/userApislice';
import { IUserRegister } from '../../types/types';
import styles from './RegisterPage.module.scss';
import { registerValidation } from '../../services/validation';
import Error from '../../components/Error/Error';

const RegisterPage: FC = () => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [isValidationError, setIsValidationError] = useState(false);
	const [register] = useRegisterUserMutation();
	const router = useNavigate();

	async function handleRegister(user: IUserRegister) {
		try {
			const res = await register(user);
			if (res) {
				router('/login');
			}
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<form
			className={styles.registerForm}
			onSubmit={(e) => {
				e.preventDefault();
				if (
					registerValidation({ userName, password, email, fullName })
				) {
					handleRegister({ userName, password, email, fullName });
				} else {
					setIsValidationError(true);
				}
			}}
		>
			<Error
				isError={isValidationError}
				setIsError={setIsValidationError}
			/>
			<input
				type='text'
				placeholder='ваше имя...'
				value={fullName}
				onChange={(e) => setFullName(e.target.value)}
			/>
			<input
				type='email'
				placeholder='ваша почта...'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				placeholder='пароль...'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<input
				type='text'
				placeholder='никнейм...'
				value={userName}
				onChange={(e) => setUserName(e.target.value)}
			/>
			<div className={styles.buttons}>
				<Button fontSize='1.25rem' type='submit'>
					зарегистрироваться
				</Button>
				<Button fontSize='1.25rem' onclick={() => router('/login')}>
					есть аккаунт?
				</Button>
			</div>
		</form>
	);
};

export default RegisterPage;
