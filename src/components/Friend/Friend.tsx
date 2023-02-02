import { useDeleteFriendMutation } from '../../store/Api/friendsApiSlice'
import { IFriend } from '../../types/types'
import Button from '../Button/Button'
import ButtonLink from '../ButtonLink/ButtonLink'
import styles from './Friend.module.scss'

export interface FriendProps {
    friend: IFriend
}

export default function Friend({ friend }: FriendProps) {
    const [deleteFriend] = useDeleteFriendMutation()

    async function handleDeleteFriend(friendId: string) {
        try {
            const res = await deleteFriend(friendId)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.friendWrapper}>
            <div className={styles.friendLeft}>
                <span></span>
                <p>@{friend.userName}</p>
            </div>

            <div className={styles.friendRight}>
                <ButtonLink
                    route={`users/${friend.userId}/posts`}
                    fontSize="1.5rem"
                >
                    posts
                </ButtonLink>
                <Button
                    fontSize="1.5rem"
                    mainColor="--error"
                    onclick={() => handleDeleteFriend(friend.userId)}
                >
                    delete
                </Button>
            </div>
        </div>
    )
}
