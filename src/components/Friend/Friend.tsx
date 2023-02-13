import { faNewspaper, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDeleteFriendMutation } from '../../store/Api/friendsApiSlice'
import { useGetUserByIdQuery } from '../../store/Api/userApislice'
import { IFriend } from '../../types/types'
import Button from '../Button/Button'
import ButtonLink from '../ButtonLink/ButtonLink'
import styles from './Friend.module.scss'

export interface FriendProps {
    friend: IFriend
}

export default function Friend({ friend }: FriendProps) {
    const [deleteFriend] = useDeleteFriendMutation()

    const {data: user} = useGetUserByIdQuery(friend.userId)        

    async function handleDeleteFriend(friendId: string) {
        try {
            await deleteFriend(friendId)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.friendWrapper}>
            <div className={styles.friendLeft}>
            {user?.pictureBase ? (
                    <div className={styles.imageWrapper}>
                        <img src={user?.pictureBase} />
                    </div>
                ) : (
                    <span></span>
                )}
                <p>@{friend.userName}</p>
            </div>

            <div className={styles.friendRight}>
                <ButtonLink
                    route={`users/${friend.userId}/posts`}
                    fontSize="1.25rem"
                >
                    <FontAwesomeIcon icon={faNewspaper} />
                </ButtonLink>
                <Button
                    fontSize="1.25rem"
                    mainColor="--error"
                    onclick={() => handleDeleteFriend(friend.userId)}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </Button>
            </div>
        </div>
    )
}
