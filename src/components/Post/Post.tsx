import { IPost } from '../../types/types'
import styles from './post.module.scss'
import {
    useGetUserByIdQuery,
    useGetUserQuery,
} from '../../store/Api/userApislice'
import {
    useCheckLikeQuery,
    useDeletePostMutation,
    useLikePostMutation,
} from '../../store/Api/postsSlice'
import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faThumbsUp,
    faMessage,
    faTrashCan,
} from '@fortawesome/free-solid-svg-icons'

export interface PostProps {
    post: IPost
}

export const Post: FC<PostProps> = ({ post }) => {
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const router = useNavigate()
    const [likePost] = useLikePostMutation()
    const [deletePost] = useDeletePostMutation()
    const { data: user } = useGetUserByIdQuery(post.userId)

    const { data: isLiked } = useCheckLikeQuery(post.postId, {
        skip: !isLogged,
    })
    const { data: currentUser } = useGetUserQuery(undefined, {
        skip: !isLogged,
    })

    async function handleLikePost(likeid: number) {
        try {
            if (isLogged) {
                const res = await likePost(likeid)
            } else {
                router('/login')
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function handleDeletePost(postId: number) {
        try {
            if (confirm('delete post?')) await deletePost(postId)
            router('/')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.postWrapper}>
            <div className={styles.postHeader}>
                {user?.pictureBase ? (
                    <div className={styles.imageWrapper}>
                        <img src={user?.pictureBase} />
                    </div>
                ) : (
                    <span></span>
                )}
                <div className={styles.postTitle}>
                    <h1>{post.title}</h1>
                    <Link to={`/users/${post.userId}/posts`}>
                        @{user?.userName}
                    </Link>
                </div>
            </div>
            {post?.pictureBase && (
                <img
                    src={post?.pictureBase}
                    className='w-full max-h-[500px] object-cover rounded'
                />
            )}
            <div className={styles.postPlot}>{post.plot}</div>
            <div className={styles.postBottom}>
                <div className={styles.buttonSection}>
                    <span>{post.likes}</span>
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        onClick={() => handleLikePost(post.postId)}
                        color={`${isLiked ? 'var(--buttonBlue)' : 'black'}`}
                    />
                </div>
                <div className={styles.buttonSection}>
                    <FontAwesomeIcon
                        icon={faMessage}
                        onClick={() => router(`/comments/${post.postId}`)}
                    />
                </div>
                {currentUser?.userName === user?.userName && (
                    <>
                        <div className={styles.buttonSection}>
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                onClick={() => {
                                    handleDeletePost(post.postId)
                                }}
                            />
                        </div>
                        <div className={styles.buttonSection}>
                            <FontAwesomeIcon
                                icon={faPen}
                                onClick={() => {
                                    router(`/posts/${post.postId}/updatePost`)
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Post
