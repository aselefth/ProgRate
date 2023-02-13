import { useParams } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Post from '../../components/Post/Post'
import { useGetUserPostsQuery } from '../../store/Api/postsSlice'
import {
    useGetUserByIdQuery,
    useGetUserQuery,
} from '../../store/Api/userApislice'
import {
    useAcceptFriendRequestMutation,
    useDeleteFriendRequestMutation,
    useGetFriendRequestsQuery,
    useGetFriendsQuery,
    useGetMyFriendRequestsQuery,
    useSendFriendRequestMutation,
} from '../../store/Api/friendsApiSlice'
import styles from './UserPostsPage.module.scss'
import { IFriend, IFriendRequest } from '../../types/types'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { logOut } from '../../store/Slices/authSlice'

export default function UserPostsPage() {
    const [friendRequest, setFriendRequest] = useState<IFriendRequest | null>(
        null
    )
    const [myFriendRequest, setMyFriendRequest] =
        useState<IFriendRequest | null>(null)
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const [isFriend, setIsFriend] = useState(false)
    const { userId } = useParams()
    const { data: posts } = useGetUserPostsQuery(String(userId))
    const { data: user } = useGetUserByIdQuery(String(userId))
    const [sendFriendRequest] = useSendFriendRequestMutation()
    const [acceptFriendRequest] = useAcceptFriendRequestMutation()
    const [deleteFriendRequest] = useDeleteFriendRequestMutation()
    const { data: requests } = useGetFriendRequestsQuery(undefined, {
        skip: !isLogged,
    })
    const { data: friends } = useGetFriendsQuery(undefined, { skip: !isLogged })
    const { data: currentUser } = useGetUserQuery(undefined, {
        skip: !isLogged,
    })
    const { data: myFriendRequests } = useGetMyFriendRequestsQuery(undefined)

    useEffect(() => {
        if (requests) {
            const req = requests.find(
                (request: IFriendRequest) => request.issuer_id === userId
            )
            if (req) {
                setFriendRequest(req)
            }
        }
    }, [requests])

    useEffect(() => {
        if (myFriendRequests) {
            const req = myFriendRequests.find(
                (request) => request.target_id === userId
            )
            if (req) {
                setMyFriendRequest(req)
            } else {
                setMyFriendRequest(null)
            }
        }
    }, [myFriendRequests])

    useEffect(() => {
        if (friends) {
            const friend = friends.find((fr: IFriend) => fr.userId === userId)
            if (friend) {
                setIsFriend(true)
            }
        }
    }, [friends])

    async function handleSendFriendRequest(userId: string) {
        try {
            await sendFriendRequest(userId)
        } catch (e) {
            console.log(e)
        }
    }

    async function handleAcceptFriendRequest(requestId: number) {
        try {
            await acceptFriendRequest(requestId)
        } catch (e) {
            console.log(e)
        }
    }

    async function handleDeleteFriendRequest(requestId: number) {
        try {
            await deleteFriendRequest(requestId)
            setMyFriendRequest(null)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.hero}>
            {user?.pictureBase ? (
                <div className={styles.avatarWrapper}>
                    <img
                        src={user?.pictureBase}
                    />
                </div>
            ) : (
                <div className={styles.avatarWrapper}></div>
            )}
                <h1 className='flex flex-col'>
                    <span>@{user?.userName}</span>
                    {!isFriend &&
                        user &&
                        currentUser &&
                        user.userName !== currentUser.userName && (
                            <Button
                                fontSize="1.25rem"
                                onclick={() => {
                                    if (friendRequest !== null) {
                                        handleAcceptFriendRequest(
                                            friendRequest.request_id
                                        )
                                    } else if (friendRequest === null) {
                                        if (myFriendRequest) {
                                        } else {
                                            handleSendFriendRequest(
                                                String(userId)
                                            )
                                        }
                                    }
                                }}
                            >
                                {friendRequest === null
                                    ? myFriendRequest
                                        ? 'отправлено'
                                        : 'запросить'
                                    : 'принять'}
                            </Button>
                        )}
                    {myFriendRequest && (
                        <Button
                            fontSize="1.25rem"
                            mainColor="--error"
                            onclick={() =>
                                handleDeleteFriendRequest(
                                    myFriendRequest.request_id
                                )
                            }
                        >
                            отклонить
                        </Button>
                    )}
                    {isFriend && (
                        <Button fontSize="1.5rem" mainColor="--error">
                            удалить
                        </Button>
                    )}
                </h1>
                <h2>{posts?.length} постов</h2>
            </div>
            {posts &&
                [...posts]
                    .reverse()
                    .map((post) => <Post post={post} key={post.postId} />)}
        </div>
    )
}
