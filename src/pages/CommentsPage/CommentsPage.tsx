import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from "../../components/Button/Button"
import Comment from "../../components/Comment/Comment"
import Post from "../../components/Post/Post"
import { useAppSelector } from "../../hooks/redux"
import {
    useAddCommentMutation,
    useGetCommentsQuery,
    useGetPostByIdQuery,
} from "../../store/Api/postsSlice"
import { ICreateComment } from "../../types/types"
import styles from "./CommentsPage.module.scss"

export default function CommentsPage() {
    const [comment, setComment] = useState("")
    const { postId } = useParams()
    const { data: comments, isLoading: isCommentsLoading } =
        useGetCommentsQuery(Number(postId))
    const { data: post, isLoading: isPostLoading } = useGetPostByIdQuery(
        Number(postId)
    )
    const [addComment] = useAddCommentMutation()
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const router = useNavigate()

    async function handleComment(body: ICreateComment) {
        try {
            if (isLogged) {
                await addComment(body)
            } else {
                router("/login")
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.pageWrapper}>
            {post && <Post post={post} />}
            <div className={styles.commentsSection}>
                {comments?.map((com) => (
                    <Comment key={com.commentId} comment={com} />
                ))}
                {isCommentsLoading && (
                    <div className={styles.commentsLoading}>Loading...</div>
                )}
            </div>
            <form
                className={styles.commentForm}
                onSubmit={(e) => {
                    e.preventDefault()
                    handleComment({
                        postId: Number(postId),
                        comment: { message: comment },
                    })
                    setComment("")
                }}
            >
                <textarea
                    placeholder="your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button fontSize="1.5rem" type="submit">
                    add
                </Button>
            </form>
        </div>
    )
}
