import Post from "../../components/Post/Post"
import { useGetAllPostsQuery } from "../../store/Api/postsSlice"
import styles from "./HomePage.module.scss"
import { IPost } from "../../types/types"
import { FC, useEffect, useState } from "react"
import Button from "../../components/Button/Button"
import { data } from "autoprefixer"
import Pagination from "../../components/Pagination/Pagination"
import { useAppSelector } from "../../hooks/redux"

const HomePage: FC = () => {
    const [pageNum, setPageNum] = useState(1)
    const [isFetching, setIsFetching] = useState(true)
    const isLogged = useAppSelector(state => state.authSlice.isLogged)
    const { data } = useGetAllPostsQuery(pageNum, {skip: !isLogged})
    

    return (
        <div className={styles.homePageWrapper}>
            {data &&
                data.page.map((post) => <Post key={post.postId} post={post} />)}
            <Pagination totalPages={Number(data?.pages)} currentPage={pageNum} setPageNumber={setPageNum}/>
        </div>
    )
}

export default HomePage
