import Friend from '../../components/Friend/Friend'
import { useAppSelector } from '../../hooks/redux'
import { useGetFriendsQuery } from '../../store/Api/friendsApiSlice'
import { IFriend } from '../../types/types'

export default function FriendsPage() {
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const { data: friends } = useGetFriendsQuery(undefined, { skip: !isLogged })

    return (
        <div className="flex flex-col items-center gap-3">
            <h1>Друзья</h1>
            {friends?.map((friend: IFriend) => (
                <Friend key={friend.userId} friend={friend} />
            ))}
            {friends && friends?.length < 1 && <h2>нет друзей (</h2>}
        </div>
    )
}
