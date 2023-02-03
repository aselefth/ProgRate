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

export interface TopBarNavigationProps {
    isLogged: boolean
}

export default function TopBarNavigation({ isLogged }: TopBarNavigationProps) {
    const dispatch = useAppDispatch()
    const router = useNavigate()
    // const {data: requests} = useGetFriendRequestsQuery(undefined, {skip: !isLogged})    

    return (
        <>
            {isLogged ? (
                <div className="flex gap-2">
                    <ButtonLink route={`account/friends`} fontSize="1.5rem">
                        <span>friends</span>
                        {/* {requests && requests.length !== 0 && (
                            <p
                                style={{ background: 'var(--buttonGray)' }}
                                className="rounded px-2"
                            >
                                !
                            </p>
                        )} */}
                    </ButtonLink>
                    <Button
                        onclick={() => {
                            router('/account')
                            dispatch(changeSearch(''))
                        }}
                        fontSize="1.5rem"
                    >
                        account
                    </Button>
                </div>
            ) : (
                <Button
                    onclick={() => {
                        router('/login')
                        dispatch(changeSearch(''))
                    }}
                    fontSize="1.5rem"
                >
                    login
                </Button>
            )}
        </>
    )
}
