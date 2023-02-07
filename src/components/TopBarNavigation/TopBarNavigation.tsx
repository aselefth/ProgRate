import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
    useGetFriendRequestsQuery,
    useLazyGetFriendRequestsQuery,
} from '../../store/Api/friendsApiSlice'
import { changeSearch } from '../../store/Slices/InterfaceSlice'
import { IFriendRequest } from '../../types/types'
import Button from '../Button/Button'
import ButtonLink from '../ButtonLink/ButtonLink'
import SpecialButtonLink from '../SpecialButtonLink/SpecialButtonLink'

export default function TopBarNavigation() {
    const { isLogged } = useAppSelector((state) => state.authSlice)
    const dispatch = useAppDispatch()
    const router = useNavigate()
    return (
        <>
            {!isLogged &&
            // ? (
            //     <div className="flex gap-2">
            //         <SpecialButtonLink />
            //         <Button
            //             onclick={() => {
            //                 router('/account')
            //                 dispatch(changeSearch(''))
            //             }}
            //             fontSize="1.5rem"
            //         >
            //             account
            //         </Button>
            //     </div>
            // ) : 
                <Button
                    onclick={() => {
                        router('/login')
                        dispatch(changeSearch(''))
                    }}
                    fontSize="1.5rem"
                >
                    login
                </Button>
            }
        </>
    )
}
