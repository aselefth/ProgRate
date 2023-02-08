import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faHandshake, faNewspaper, faFileImport, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { logOut } from '../../store/Slices/authSlice'
import Button from '../Button/Button'

export default function LeftSide() {
    const { isLogged } = useAppSelector((state) => state.authSlice)
    const router = useNavigate()
    const dispatch = useAppDispatch()

    const logout = () => {
        localStorage.removeItem('token')
        dispatch(logOut())
        router('/login')
    }

    return (
        <>
            {isLogged && <div className="flex flex-col gap-2">
                <div className="flex flex-col items-center w-40 bg-white rounded-lg shadow-md">
                    <div
                    className='cursor-pointer hover:bg-gray-50 w-full flex gap-4 text-xl items-center p-2 rounded-t-lg'
                        onClick={() => router('/account')}
                    >
                        <FontAwesomeIcon icon={faUser}/>
                        <span>account</span>
                    </div>
                    <div
                    className='cursor-pointer hover:bg-gray-50 w-full flex gap-4 text-xl items-center p-2 rounded-b-lg'
                        onClick={() => router('/createPost')}
                    >
                        <FontAwesomeIcon icon={faFileImport}/>
                        <span>new post</span>
                    </div>
                </div>

                <div className="flex flex-col items-center w-40 bg-white rounded-lg shadow-md">
                    <div
                    className='cursor-pointer hover:bg-gray-50 w-full flex gap-4 text-xl items-center p-2 rounded-t-lg'
                        onClick={() => router('/')}
                    >
                        <FontAwesomeIcon icon={faNewspaper}/>
                        <span>feed</span>
                    </div>
                    <div
                    className='cursor-pointer hover:bg-gray-50 w-full flex gap-4 text-xl items-center p-2'
                        onClick={() => router('/account/friends')}
                    >
                        <FontAwesomeIcon icon={faUserGroup}/>
                        <span>friends</span>
                    </div>
                    <div
                    className='cursor-pointer hover:bg-gray-50 w-full flex gap-4 text-xl items-center p-2'
                        onClick={() => router('/account/friends/requests')}
                    >
                        <FontAwesomeIcon icon={faHandshake}/>
                        <span>requests</span>
                    </div>
                    <div className='cursor-pointer hover:bg-gray-50 w-full flex gap-4 text-xl items-center p-2 rounded-b-lg'
                        onClick={() => {
                            logout()
                        }}
                    >
                        <FontAwesomeIcon icon={faRightFromBracket}/>
                        <span>quit</span>
                    </div>
                </div>
            </div>}
        </>
    )
}
