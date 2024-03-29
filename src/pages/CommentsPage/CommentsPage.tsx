import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Comment from '../../components/Comment/Comment'
import Post from '../../components/Post/Post'
import { useAppSelector } from '../../hooks/redux'
import {
    useAddCommentMutation,
    useGetCommentsQuery,
} from '../../store/Api/CommentsApiSlice'
import { useGetPostByIdQuery } from '../../store/Api/postsSlice'
import { ICreateComment } from '../../types/types'
import styles from './CommentsPage.module.scss'

export default function CommentsPage() {
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const [comment, setComment] = useState('')
    const { postId } = useParams()
    const { data: comments, isLoading: isCommentsLoading } =
        useGetCommentsQuery(Number(postId))
    const { data: post } = useGetPostByIdQuery(Number(postId), {skip: !postId})
    const [addComment] = useAddCommentMutation()
    const router = useNavigate()

    async function handleComment(body: ICreateComment) {
        try {
            if (isLogged) {
                await addComment(body)
            } else {
                router('/login')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.pageWrapper}>
            {post && <Post postId={Number(postId)} />}
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
                    setComment('')
                }}
            >
                <textarea
                    placeholder="ваша реакция..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button fontSize="1.25rem" type="submit">
                <FontAwesomeIcon
                        icon={faPaperPlane}
                    />
                </Button>
            </form>
        </div>
    )
}
