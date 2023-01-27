import Post from "../../components/Post/Post";
import { useGetAllPostsQuery } from "../../store/Api/postsSlice";
import styles from './HomePage.module.scss'
import { IPost } from "../../types/types";
import { FC } from "react";

const HomePage: FC = () => {
    const {data: posts} = useGetAllPostsQuery(undefined)
    
    return (
        <div className={styles.homePageWrapper}>
            {posts && [...posts].reverse().map((post) => <Post key={post.postId} post={post} />)}
        </div>
    )
}

export default HomePage;