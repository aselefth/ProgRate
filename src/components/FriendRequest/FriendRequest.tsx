import { faCheck, faCross, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import {
    useAcceptFriendRequestMutation,
    useRejectFriendRequestMutation,
} from '../../store/Api/friendsApiSlice'
import { useGetUserByIdQuery } from '../../store/Api/userApislice'
import { IFriendRequest } from '../../types/types'
import Button from '../Button/Button'
import styles from './FriendRequest.module.scss'

export interface FriendRequestProps {
    request: IFriendRequest
}

export default function FriendRequest({ request }: FriendRequestProps) {
    const { data: user } = useGetUserByIdQuery(request.issuer_id)
    const [acceptFriendRequest] = useAcceptFriendRequestMutation()
    const [declineFriendRequest] = useRejectFriendRequestMutation()
    const router = useNavigate()

    async function handleAcceptFriendRequest(requestId: number) {
        try {
            await acceptFriendRequest(requestId)
        } catch (e) {
            console.log(e)
        }
    }

    async function handleDeclineFriendRequest(requestId: number) {
        try {
            await declineFriendRequest(requestId)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.friendWrapper}>
            <div className={styles.friendLeft}>
                <span></span>
                <p onClick={() => router(`/users/${request.issuer_id}/posts`)}>
                    @{user?.userName}
                </p>
            </div>

            <div className={styles.friendRight}>
                <Button
                    fontSize="1.25rem"
                    onclick={() => {
                        handleAcceptFriendRequest(request.request_id)
                    }}
                >
                    <FontAwesomeIcon icon={faCheck} />
                </Button>
                <Button
                    fontSize="1.25rem"
                    mainColor="--error"
                    onclick={() => {
                        handleDeclineFriendRequest(request.request_id)
                    }}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </Button>
            </div>
        </div>
    )
}
