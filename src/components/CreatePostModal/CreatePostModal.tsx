import { FC, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { toggleModal } from "../../store/Slices/InterfaceSlice"
import styles from "./CreatePostModal.module.scss"
import { useCreatePostMutation } from "../../store/Api/postsSlice"
import { ICreatePost } from "../../types/types"
import Button from "../Button/Button"
import Error from "../Error/Error"
import { postValidation } from "../../services/validation"

const CreatePostModal: FC = () => {
    const [title, setTitle] = useState("")
    const [plot, setPlot] = useState("")
    const [isValidationError, setIsValidationError] = useState(false)
    const dispatch = useAppDispatch()
    const [createPost] = useCreatePostMutation()
    const isModalOpened = useAppSelector(
        (state) => state.InterfaceSlice.isAddPostModalOpened
    )

    async function handleCreatePost(post: ICreatePost) {
        try {
            if (postValidation(post)) {
                await createPost(post)
                dispatch(toggleModal())
                setTitle("")
                setPlot("")
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
                dispatch(toggleModal())
                setTitle("")
                setPlot("")
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
                    handleCreatePost({ title, plot })
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
                <Button type="submit" fontSize="1.5rem">
                    create post
                </Button>
            </form>
        </div>
    )
}

export default CreatePostModal
