import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import search from '../../assets/search.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useDebounce } from '../../hooks/useDebounce'
import { useGetPostsByTitleQuery } from '../../store/Api/postsSlice'
import { changeSearch } from '../../store/Slices/InterfaceSlice'
import SearchPost from '../SearchPost/SearchPost'
import styles from './Search.module.scss'

export const Search: FC = () => {
    const dispatch = useAppDispatch()
    const router = useNavigate()
    
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
                placeholder="что вам интересно.."
                value={value}
                onChange={(e) => dispatch(changeSearch(e.target.value))}
                onFocus={() => {
                    setIsSearching(true)
                }}
                onBlur={() => setTimeout(() => setIsSearching(false), 200)}
            />
            <span
                className={styles.searchBtn}
                onClick={() => value ? router(`/search/${value}`) : null}
            >
                <img src={search} alt="search" width="30" />
            </span>

            <div
                className={`${styles.searchModal} ${
                    isSearching
                        ? styles.searchModalOpened
                        : styles.searchModalClosed
                }`}
            >
                {posts ? (
                    posts.length !== 0 ? (
                        posts.map((post) => (
                            <SearchPost key={post.postId} post={post} />
                        ))
                    ) : (
                        <span className={styles.noResults}>нет результатов</span>
                    )
                ) : (
                    <span className={styles.noResults}>нет результатов</span>
                )}
            </div>
        </div>
    )
}

export default Search
