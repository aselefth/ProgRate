import { IPost } from "../../types/types"
import dislike from "../../assets/like.svg"
import like from "../../assets/likePressed.svg"
import comment from "../../assets/comment.svg"
import styles from "./post.module.scss"
import { useGetUserByIdQuery } from "../../store/Api/userApislice"
import {
    useCheckLikeQuery,
    useLikePostMutation,
} from "../../store/Api/postsSlice"
import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../hooks/redux"

export interface PostProps {
    post: IPost
}

export const Post: FC<PostProps> = ({ post }) => {
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const router = useNavigate()
    const [likePost] = useLikePostMutation()
    const { data: user } = useGetUserByIdQuery(post.userId)
    const { data: isLiked } = useCheckLikeQuery(post.postId, {
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

    return (
        <div className={styles.postWrapper}>
            <div className={styles.postHeader}>
                <span></span>
                <div className={styles.postTitle}>
                    <h1>{post.title}</h1>
                    <Link to={`/users/${post.userId}/posts`}>@{user?.userName}</Link>
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
            </div>
        </div>
    )
}

export default Post
