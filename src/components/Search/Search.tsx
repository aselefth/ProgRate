import { FC, useState } from "react"
import search from "../../assets/search.svg"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { useDebounce } from "../../hooks/useDebounce"
import { useGetPostsByTitleQuery } from "../../store/Api/postsSlice"
import { changeSearch, toggleModal } from "../../store/Slices/InterfaceSlice"
import Button from "../Button/Button"
import SearchPost from "../SearchPost/SearchPost"
import styles from "./Search.module.scss"

export const Search: FC = () => {
    const dispatch = useAppDispatch()
    const isModalOpened = useAppSelector(
        (state) => state.InterfaceSlice.isAddPostModalOpened
    )
    const value = useAppSelector((state) => state.InterfaceSlice.searchValue)
    const [isSearching, setIsSearching] = useState(false)
    const debouncedValue = useDebounce(value, 400)
    const { data: posts } = useGetPostsByTitleQuery(debouncedValue, {
        skip: debouncedValue.length < 3,
    })

    return (
        <div className={styles.search}>
            <input
                type="text"
                placeholder="you interested in.."
                value={value}
                onChange={(e) => dispatch(changeSearch(e.target.value))}
                onFocus={() => {
                    setIsSearching(true)
                    isModalOpened === true && dispatch(toggleModal())
                }}
                onBlur={() => setTimeout(() => setIsSearching(false), 100)}
            />
            <span className={styles.searchBtn}>
                <img src={search} alt="search" width="30" />
            </span>

            <div
                className={`${styles.searchModal} ${
                    isSearching
                        ? styles.searchModalOpened
                        : styles.searchModalClosed
                }`}
            >
                {posts && posts.length !== 0 ? (
                    posts.map((post) => (
                        <SearchPost key={post.postId} post={post} />
                    ))
                ) : (
                    <span className={styles.noResults}>no results</span>
                )}
                {<span className={styles.noResults}>no results</span>}
            </div>
        </div>
    )
}

export default Search
