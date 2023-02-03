import styles from './PostSkeleton.module.scss'

export default function PostSkeleton () {
    return (
        <div className={styles.postWrapper}>
            <div className={styles.header}>
                <span></span>
                <div className={styles.headerRight}>
                    <h1></h1>
                    <h2></h2>
                </div>
            </div>
            <div className={styles.plot}></div>
            <div className={styles.bottom}>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
            </div>
        </div>
    )
}