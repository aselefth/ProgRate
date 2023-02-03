import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux'
import { useGetUserByIdQuery } from '../../store/Api/userApislice'
import { toggleSearchModal } from '../../store/Slices/InterfaceSlice'
import { IPost } from '../../types/types'
import styles from './SearchPost.module.scss'

export interface SearchPostProps {
    post: IPost
}

export default function SearchPost({ post }: SearchPostProps) {
    const { data: user } = useGetUserByIdQuery(post.userId)
    const router = useNavigate()
    const dispatch = useAppDispatch()

    return (
        <div
            className={styles.postWrapper}
            onClick={() => {
                router(`/comments/${post.postId}`)
                dispatch(toggleSearchModal())
            }}
        >
            <div className={styles.postHeader}>
                <span></span>
                <div className={styles.postTitle}>
                    <h1>
                        {post.title.length > 32
                            ? post.title.slice(0, 32) + '...'
                            : post.title}
                    </h1>
                    <Link to={`/users/${post.userId}/posts`}>
                        @{user?.userName}
                    </Link>
                </div>
            </div>
        </div>
    )
}
