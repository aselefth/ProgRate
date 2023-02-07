import FriendRequest from '../../components/FriendRequest/FriendRequest'
import { useAppSelector } from '../../hooks/redux'
import { useGetFriendRequestsQuery } from '../../store/Api/friendsApiSlice'
import { IFriendRequest } from '../../types/types'

export default function RequestsPage() {
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const { data: requests } = useGetFriendRequestsQuery(undefined, {
        skip: !isLogged,
    })

    return (
        <div className="flex flex-col items-end gap-3">
            {requests?.map((request: IFriendRequest) => (
                <FriendRequest key={request.request_id} request={request} />
            ))}
        </div>
    )
}
