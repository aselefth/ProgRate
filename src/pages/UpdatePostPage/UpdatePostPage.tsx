import { useEffect, useRef, useState } from 'react'
import Button from '../../components/Button/Button'
import { useImage } from '../../hooks/useImage'
import { postValidation } from '../../services/validation'
import {
    useGetPostByIdQuery,
    useUpdatePostMutation,
} from '../../store/Api/postsSlice'
import { ICreatePost } from '../../types/types'
import styles from './UpdatePostPage.module.scss'
import Error from '../../components/Error/Error'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdatePostPage() {
    const { postId } = useParams()
    const [title, setTitle] = useState('')
    const [plot, setPlot] = useState('')
    const { avatar, handleSetAvatar, setAvatar } = useImage()
    const [isValidationError, setIsValidationError] = useState(false)
    const [updatePost] = useUpdatePostMutation()
    const router = useNavigate()
    const ref = useRef<HTMLInputElement>(null)
    const { data: post } = useGetPostByIdQuery(Number(postId))

    useEffect(() => {
        console.log('helo')
        if (post) {
            setTitle(post.title)
            setPlot(post.plot)
            setAvatar(post.pictureBase ? post.pictureBase : '')
            
        }
    }, [post])

    async function handleUpdatePost(updatePostDto: ICreatePost) {
        try {
            if (postValidation(updatePostDto)) {
                await updatePost({
                    postId: Number(post?.postId),
                    body: updatePostDto,
                })
                router('/')
            } else {
                setIsValidationError(true)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            {post && (
                <form
                    className={styles.createPostPageWrapper}
                    onClick={(event) => {
                        event.stopPropagation()
                    }}
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleUpdatePost({ plot, title, pictureBase: avatar })
                    }}
                >
                    <input
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        value={plot}
                        onChange={(e) => setPlot(e.target.value)}
                    />
                    {avatar && (
                        <div className={styles.imageStack}>
                            <div className={styles.imageContainer}>
                                <span
                                    onClick={() => {
                                        setAvatar('')
                                        if (ref.current && ref.current.value) {
                                            ref.current.value = ''
                                        }
                                    }}
                                >
                                    x
                                </span>
                                <img src={avatar} />
                            </div>
                        </div>
                    )}
                    <input
                        type="file"
                        onChange={handleSetAvatar}
                        name={avatar}
                        ref={ref}
                    />
                    <Button type="submit" fontSize="1.25rem">
                        update post
                    </Button>
                    <Error
                        isError={isValidationError}
                        setIsError={setIsValidationError}
                    />
                </form>
            )}
        </>
    )
}
