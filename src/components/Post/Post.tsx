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
import { useNavigate } from "react-router-dom"

export interface PostProps {
    post: IPost
}

export const Post: FC<PostProps> = ({ post }) => {
    const [likePost] = useLikePostMutation()
    const { data: user } = useGetUserByIdQuery(post.userId)
    const { data: isLiked } = useCheckLikeQuery(post.postId)

    const router = useNavigate()

    async function handleLikePost(likeid: number) {
        const res = await likePost(likeid)
    }

    return (
        <div className={styles.postWrapper}>
            <div className={styles.postHeader}>
                <span></span>
                <div className={styles.postTitle}>
                    <h1>{post.title}</h1>
                    <h2>@{user?.userName}</h2>
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
                <img src={comment} width="24" alt="comment" onClick={() => router(`/comments/${post.postId}`)}/>
            </div>
        </div>
    )
}

export default Post
