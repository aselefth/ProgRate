import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../store/Api/authApiSlice';
import { setCredentials } from '../store/Slices/authSlice';
import { IUserLogin } from '../types/types';
import { useAppDispatch } from './redux';
import { useCookies } from 'react-cookie';

export function useLogin() {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
    const [cookies, setCookie] = useCookies();
    //!РАЗОБРАТЬСЯ С КУКИСАМИ ИЛИ СДЕЛАТЬ ОЧИСТКУ ЛОКАЛСТОРАДЖ ПРИ ЗАВЕРШЕНИИ СЕССИИ

	const dispatch = useAppDispatch();
	const [auth] = useLoginMutation();
	const router = useNavigate();

	const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) =>
		setUserName(e.target.value);

	const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	async function handleAuth(user: IUserLogin) {
		try {
			const res = await auth({
				userName: user.userName,
				password: user.password
			}).unwrap();

			if (res.token) {
				localStorage.setItem('token', res.token);
				dispatch(setCredentials({ token: res.token, isLogged: true }));
				router('/');
				setError('');
				setUserName('');
				setPassword('');
				setCookie('token', res.token);
			}
		} catch (e: any) {
			setError(e.data);
		}
	}

	return {
		handleAuth,
		handleChangeLogin,
		handleChangePassword,
		password,
		userName,
		error
	};
}
