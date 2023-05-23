import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUserGroup,
	faHandshake,
	faNewspaper,
	faFileImport,
	faRightFromBracket,
	faUser,
	faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logOut } from '../../store/Slices/authSlice';
import { useEffect, useState } from 'react';
import styles from './LeftSide.module.scss';
import { setGroupName } from '../../store/Slices/connectionSlice';
import { useCookies } from 'react-cookie';

type TabsType =
	| 'feed'
	| 'account'
	| 'new post'
	| 'friends'
	| 'requests'
	| 'messages';

export default function LeftSide() {
	const isLogged = useAppSelector((state) => state.authSlice.isLogged);
	const [currentTab, setCurrentTab] = useState<TabsType>('feed');
	const router = useNavigate();
	const dispatch = useAppDispatch();
	const location = useLocation();
	const { connection } = useAppSelector((state) => state.connectionSlice);
	const { groupName } = useAppSelector((state) => state.connectionSlice);
	const [cookies, setCookie, deleteCookie] = useCookies(['token']);

	useEffect(() => {
		if (!groupName) {
			return;
		}
		if (location.pathname !== `/messages/${groupName}`) {
			connection.stop();
			dispatch(setGroupName({ groupName: '' }));
		}
	});

	useEffect(() => {
		switch (location.pathname) {
			case '/':
				setCurrentTab('feed');
				break;
			case '/account':
				setCurrentTab('account');
				break;
			case '/account/friends':
				setCurrentTab('friends');
				break;
			case '/account/friends/requests':
				setCurrentTab('requests');
				break;
			case '/createPost':
				setCurrentTab('new post');
				break;
			case '/messages':
				setCurrentTab('messages');
				break;
			case `/messages/${groupName}`:
				setCurrentTab('messages');
				break;
			default:
				setCurrentTab('feed');
				break;
		}
	}, [location, groupName]);

	const logout = () => {
		localStorage.removeItem('token');
		dispatch(logOut());
		router('/login');
		deleteCookie('token');
	};

	return (
		<>
			{isLogged && (
				<div className={styles.sideNavigation}>
					<div className={styles.sideNavigationSection}>
						<div
							className={`${styles.sideNavigationElement} ${
								currentTab === 'account' && styles.activeTab
							}`}
							onClick={() => router('/account')}
						>
							<FontAwesomeIcon icon={faUser} />
							<span>аккаунт</span>
						</div>
						<div
							className={`${styles.sideNavigationElement} ${
								currentTab === 'new post' && styles.activeTab
							}`}
							onClick={() => router('/createPost')}
						>
							<FontAwesomeIcon icon={faFileImport} />
							<span>поделиться</span>
						</div>

						<div
							className={`${styles.sideNavigationElement} ${
								currentTab === 'feed' && styles.activeTab
							}`}
							onClick={() => router('/')}
						>
							<FontAwesomeIcon icon={faNewspaper} />
							<span>лента</span>
						</div>
						<div
							className={`${styles.sideNavigationElement} ${
								currentTab === 'friends' && styles.activeTab
							}`}
							onClick={() => router('/account/friends')}
						>
							<FontAwesomeIcon icon={faUserGroup} />
							<span>друзья</span>
						</div>
						<div
							className={`${styles.sideNavigationElement} ${
								currentTab === 'messages' && styles.activeTab
							}`}
							onClick={() => router('/messages')}
						>
							<FontAwesomeIcon icon={faEnvelope} />
							<span>сообщения</span>
						</div>
						<div
							className={`${styles.sideNavigationElement} ${
								currentTab === 'requests' && styles.activeTab
							}`}
							onClick={() => router('/account/friends/requests')}
						>
							<FontAwesomeIcon icon={faHandshake} />
							<span>запросы</span>
						</div>
						<div
							className={`${styles.sideNavigationElement}`}
							onClick={() => {
								logout();
							}}
						>
							<FontAwesomeIcon icon={faRightFromBracket} />
							<span>выйти</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
