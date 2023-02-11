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
        <div className="flex flex-col items-center gap-3">
            <h1>Запросы</h1>
            {requests?.map((request: IFriendRequest) => (
                <FriendRequest key={request.request_id} request={request} />
            ))}
            {requests && requests?.length < 1 && <h2>нет запросов</h2>}
        </div>
    )
}
