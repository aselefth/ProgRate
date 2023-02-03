import { useAppSelector } from '../../hooks/redux'
import { useGetFriendRequestsQuery } from '../../store/Api/friendsApiSlice'
import ButtonLink from '../ButtonLink/ButtonLink'

export default function SpecialButtonLink() {
    const { isLogged } = useAppSelector((app) => app.authSlice)
    const { data: requests } = useGetFriendRequestsQuery(undefined, {
        skip: !isLogged,
    })
    return (
        <>
            <ButtonLink route={`account/friends`} fontSize="1.5rem">
                <span>friends</span>
                {requests && requests.length !== 0 && (
                    <p
                        style={{ background: 'var(--buttonGray)' }}
                        className="rounded px-2"
                    >
                        !
                    </p>
                )}
            </ButtonLink>
        </>
    )
}
