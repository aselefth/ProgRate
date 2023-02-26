import { useGetUserByIdQuery } from '../../store/Api/userApislice'
import { IMessage } from '../../types/types'
import styles from './Message.module.scss'

interface MessageProps {
    chat: IMessage
}

export default function Message({ chat }: MessageProps) {
    const { data: user } = useGetUserByIdQuery(chat.userId)

    return (
        <div className={styles.messageWrapper}>
            {user && (
                <>
                    <span className={styles.logo}>
                        {user?.pictureBase && <img src={user?.pictureBase} />}
                    </span>
                    <div className={styles.contentSide}>
                        {user && <h2>{user?.userName}</h2>}
                        <p>{chat.message}</p>
                    </div>
                </>
            )}
        </div>
    )
}
