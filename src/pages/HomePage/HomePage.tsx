import Post from '../../components/Post/Post'
import { useGetAllPostsQuery } from '../../store/Api/postsSlice'
import styles from './HomePage.module.scss'
import { FC, useState } from 'react'
import Pagination from '../../components/Pagination/Pagination'
import { useAppSelector } from '../../hooks/redux'
import PostSkeleton from '../../skeletons/PostSkeleton/PostSkeleton'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'

const HomePage: FC = () => {
    const [pageNum, setPageNum] = useState(1)
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const { data, isLoading } = useGetAllPostsQuery(pageNum)
    const router = useNavigate()

    return (
        <div className={styles.homePageWrapper}>
            {isLoading && (
                <>
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </>
            )}
            {isLogged && (
                <div className={styles.createPostWrapper}>
                    <span>появилось что-то новое?</span>
                    <Button
                        fontSize="1.25rem"
                        onclick={() => router('/createPost')}
                    >
                        добавить
                    </Button>
                </div>
            )}
            {data &&
                data.page.map((post) => <Post key={post.postId} post={post} />)}
            {Number(data?.pages) > 1 && (
                <Pagination
                    totalPages={Number(data?.pages)}
                    currentPage={pageNum}
                    setPageNumber={setPageNum}
                />
            )}
        </div>
    )
}

export default HomePage
