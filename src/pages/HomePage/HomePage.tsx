import Post from "../../components/Post/Post"
import { useGetAllPostsQuery } from "../../store/Api/postsSlice"
import styles from "./HomePage.module.scss"
import { IPost } from "../../types/types"
import { FC, useEffect, useState } from "react"
import Button from "../../components/Button/Button"

const HomePage: FC = () => {
    const [posts, setPosts] = useState<IPost[]>([])
    const [pageNum, setPageNum] = useState(1)
    const [isFetching, setIsFetching] = useState(true)
    const { data, isLoading } = useGetAllPostsQuery(pageNum)

    useEffect(() => {
        if (data) {
            setPosts([...posts, ...data.page])
        }
    }, [data])

    const handlePagination = () => {
        if (data && data.pages > pageNum) {
            setPageNum((prev) => prev + 1)
        }
    }

    return (
        <div className={styles.homePageWrapper}>
            {data &&
                posts.map((post) => <Post key={post.postId} post={post} />)}
            {data && data.pages > pageNum && (
                <Button
                    fontSize="1.5rem"
                    width="7rem"
                    onclick={() => {
                        handlePagination()
                    }}
                >
                    load more
                </Button>
            )}
        </div>
    )
}

export default HomePage
