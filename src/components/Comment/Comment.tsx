import { IComment } from "../../types/types"
import styles from "./Comment.module.scss"

export interface CommentProps {
    comment: IComment
}

export default function Comment({ comment }: CommentProps) {
    return (
        <div className={styles.commentWrapper}>
            <p>{comment.message}</p>
        </div>
    )
}
