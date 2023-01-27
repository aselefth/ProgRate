import { FC } from "react";
import search from '../../assets/search.svg';
import styles from './Search.module.scss'

export const Search: FC = () => {
    return (
        <div className={styles.search}>
            <input type='text' placeholder="you interested in.."/>
            <span className={styles.searchBtn}>
                <img src={search} alt='search' width='30' />
            </span>
        </div>
    )
}

export default Search;