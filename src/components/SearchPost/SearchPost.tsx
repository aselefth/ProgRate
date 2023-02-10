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
                console.log('hello');
                
                router(`/comments/${post.postId}`)
                setTimeout(() => dispatch(toggleSearchModal()), 1000)
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
                    <p className='text-gray-300'>@{user?.userName}</p>
                </div>
            </div>
        </div>
    )
}
