import { useState } from "react"
import { useParams } from "react-router-dom"
import Button from "../../components/Button/Button"
import Comment from "../../components/Comment/Comment"
import {
    useAddCommentMutation,
    useGetCommentsQuery,
} from "../../store/Api/postsSlice"
import { ICreateComment } from "../../types/types"
import styles from "./CommentsPage.module.scss"

export default function CommentsPage() {
    const [comment, setComment] = useState("")
    const { postId } = useParams()
    const { data: comments } = useGetCommentsQuery(Number(postId))
    console.log(comments)
    const [addComment] = useAddCommentMutation()

    async function handleComment(body: ICreateComment) {
        try {
            await addComment(body)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.commentsSection}>
                {comments?.map((com) => (
                    <Comment key={com.commentId} comment={com} />
                ))}
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
