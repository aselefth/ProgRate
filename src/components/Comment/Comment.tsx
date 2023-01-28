import { useGetUserByIdQuery } from "../../store/Api/userApislice"
import { IComment } from "../../types/types"
import styles from "./Comment.module.scss"

export interface CommentProps {
    comment: IComment
}

export default function Comment({ comment }: CommentProps) {
    const { data: user } = useGetUserByIdQuery(comment.userId)
    
    return (
        <div className={styles.commentWrapper}>
            <div className={styles.commentTop}>
                <span></span>
                <p>@{user?.userName}</p>
            </div>
            <p>{comment.message}</p>
        </div>
    )
}
