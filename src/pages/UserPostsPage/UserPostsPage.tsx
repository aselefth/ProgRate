import { useParams } from "react-router-dom"
import Post from "../../components/Post/Post"
import { useGetUserPostsQuery } from "../../store/Api/postsSlice"
import { useGetUserByIdQuery } from "../../store/Api/userApislice"
import styles from "./UserPostsPage.module.scss"

export default function UserPostsPage() {
    const { userId } = useParams()
    const { data: posts } = useGetUserPostsQuery(String(userId))
    const {data: user} = useGetUserByIdQuery(String(posts && posts[0].userId))

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.hero}>
                <h1>
                    <span>@{user?.userName}'s</span> posts
                </h1>
                <h2>{posts?.length} posts</h2>
            </div> 
            {posts &&
                [...posts]
                    .reverse()
                    .map((post) => <Post post={post} key={post.postId} />)}
        </div>
    )
}
