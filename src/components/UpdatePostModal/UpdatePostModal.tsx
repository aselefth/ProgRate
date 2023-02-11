import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { toggleUpdateModal } from '../../store/Slices/InterfaceSlice'
import styles from './UpdatePostModal.module.scss'
import { useUpdatePostMutation } from '../../store/Api/postsSlice'
import { ICreatePost, IPost } from '../../types/types'
import Button from '../Button/Button'
import Error from '../Error/Error'
import { postValidation } from '../../services/validation'
import { useImage } from '../../hooks/useImage'

export interface CreatePostModalProps {
    post: IPost
}

const UpdatePostModal: FC<CreatePostModalProps> = ({ post }) => {
    const [title, setTitle] = useState('')
    const [plot, setPlot] = useState('')
    const [isValidationError, setIsValidationError] = useState(false)
    const {avatar, handleSetAvatar, setAvatar} = useImage()
    const dispatch = useAppDispatch()
    const [updatePost] = useUpdatePostMutation()
    const isModalOpened = useAppSelector(
        (state) => state.InterfaceSlice.isUpdatePostModalOpened
    )

    useEffect(() => {
        setTitle(post.title)
        setPlot(post.plot)
        setAvatar(post.pictureBase ? post.pictureBase : '')
    }, [isModalOpened])

    async function handleUpdatePost(updatePostDto: ICreatePost) {
        try {
            if (postValidation(post)) {
                await updatePost({ postId: post.postId, body: updatePostDto })
                dispatch(toggleUpdateModal())
            } else {
                setIsValidationError(true)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div
            onClick={() => {
                dispatch(toggleUpdateModal())
            }}
            className={`${
                isModalOpened
                    ? styles.modalWrapperOpened
                    : styles.modalWrapperClosed
            } ${styles.modalWrapper}`}
        >
            <Error
                isError={isValidationError}
                setIsError={setIsValidationError}
            />
            <form
                onClick={(event) => {
                    event.stopPropagation()
                }}
                onSubmit={(e) => {
                    e.preventDefault()
                    handleUpdatePost({ plot, title, pictureBase: avatar })
                }}
                className={`${
                    isModalOpened ? styles.modalOpened : styles.modalClosed
                } ${styles.modal}`}
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
                <input type='file' onChange={handleSetAvatar}/>
                <Button type="submit" fontSize="1.5rem">
                    update
                </Button>
            </form>
        </div>
    )
}

export default UpdatePostModal
