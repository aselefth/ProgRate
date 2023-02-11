import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../../components/Post/Post'
import { useAppDispatch } from '../../hooks/redux'
import { useGetPostsByTitleQuery } from '../../store/Api/postsSlice'
import { changeSearch } from '../../store/Slices/InterfaceSlice'
import styles from './SearchPostsPage.module.scss'

export default function SearchPostsPage() {
    const { searchTitle } = useParams()
    const { data: posts } = useGetPostsByTitleQuery(String(searchTitle), {skip: String(searchTitle).length < 2})
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(changeSearch(searchTitle))
    }, [])

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.hero}>
                <h1>
                    <span>{posts?.length}</span> posts found
                </h1>
            </div>
            {posts &&
                [...posts]
                    .reverse()
                    .map((post) => <Post post={post} key={post.postId} />)}
        </div>
    )
}
