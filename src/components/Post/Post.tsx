import { IPost } from "../../types/types"
import dislike from "../../assets/like.svg"
import like from "../../assets/likePressed.svg"
import comment from "../../assets/comment.svg"
import trash from "../../assets/trash.svg"
import pen from "../../assets/pen.svg"
import styles from "./post.module.scss"
import {
    useGetUserByIdQuery,
    useGetUserQuery,
} from "../../store/Api/userApislice"
import {
    useCheckLikeQuery,
    useDeletePostMutation,
    useLikePostMutation,
} from "../../store/Api/postsSlice"
import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import UpdatePostModal from "../UpdatePostModal/UpdatePostModal"
import { setUpdatePostDto, toggleUpdateModal } from "../../store/Slices/InterfaceSlice"

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
    const { data: currentUser } = useGetUserQuery(undefined)
    const dispatch = useAppDispatch()

    async function handleLikePost(likeid: number) {
        try {
            if (isLogged) {
                const res = await likePost(likeid)
            } else {
                router("/login")
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function handleDeletePost(postId: number) {
        try {
            if (confirm("delete post?")) await deletePost(postId)
            router("/")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.postWrapper}>
            <div className={styles.postHeader}>
                <span></span>
                <div className={styles.postTitle}>
                    <h1>{post.title}</h1>
                    <Link to={`/users/${post.userId}/posts`}>
                        @{user?.userName}
                    </Link>
                </div>
            </div>
            <div className={styles.postPlot}>{post.plot}</div>
            <div className={styles.postBottom}>
                <div className={styles.buttonSection}>
                    <span>{post.likes}</span>
                    <img
                        src={isLiked ? like : dislike}
                        width="24"
                        alt="like"
                        onClick={() => handleLikePost(post.postId)}
                    />
                </div>
                <div className={styles.buttonSection}>
                    <img
                        src={comment}
                        width="24"
                        alt="comment"
                        onClick={() => router(`/comments/${post.postId}`)}
                    />
                </div>
                {currentUser?.userName === user?.userName && (
                    <>
                        <div className={styles.buttonSection}>
                            <img
                                src={trash}
                                width="24"
                                alt="comment"
                                onClick={() => {
                                    handleDeletePost(post.postId)
                                }}
                            />
                        </div>
                        <div className={styles.buttonSection}>
                            <img
                                src={pen}
                                width="24"
                                alt="comment"
                                onClick={() => {
                                    dispatch(setUpdatePostDto({updatePostDto: post}))
                                    dispatch(toggleUpdateModal())
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
