import { FC, useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';
import LeftSide from '../LeftSide/LeftSide';
import Loader from '../Loader/Loader';
import Navigation from '../Navigation/Navigation';
import styles from './Layout.module.scss';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Layout: FC = () => {
    const navigate = useNavigate();
	const [cookie] = useCookies(['token']);

    useLayoutEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
		if (!cookie) {
			navigate('/login');
		}
    }, []);
	return (
		<div className={styles.layoutWrapper}>
			<Loader />
			<Navigation />
			<LeftSide />
			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
