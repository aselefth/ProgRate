import { useState } from "react"
import Button from "../../components/Button/Button"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { useImage } from "../../hooks/useImage"
import { postValidation } from "../../services/validation"
import { useCreatePostMutation } from "../../store/Api/postsSlice"
import { ICreatePost } from "../../types/types"
import styles from './CreatePostPage.module.scss'
import Error from "../../components/Error/Error"

export default function CreatePostPage () {
    const [title, setTitle] = useState("")
    const [plot, setPlot] = useState("")
    const {avatar, handleSetAvatar, setAvatar} = useImage()
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
                setTitle("")
                setPlot("")
                setAvatar('')
            } else {
                setIsValidationError(true)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div
        className="flex items-center justify-center bg-white p-4 rounded-xl relative"
            onClick={() => {
                setTitle("")
                setPlot("")
            }}
        >
            <Error
                isError={isValidationError}
                setIsError={setIsValidationError}
            />
            <form
            className="flex flex-col items-center gap-4"
                onClick={(event) => {
                    event.stopPropagation()
                }}
                onSubmit={(e) => {
                    e.preventDefault()
                    handleCreatePost({ title, plot, pictureBase: avatar })
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
                <input type='file' onChange={handleSetAvatar}/>
                <Button type="submit" fontSize="1.5rem">
                    create post
                </Button>
            </form>
        </div>
    )
}