import { createSlice } from "@reduxjs/toolkit";
import { ICreatePost, IPost } from "../../types/types";

export interface InitialState {
    isAddPostModalOpened: boolean
    isSearchModal: boolean
    searchValue: string
    isUpdatePostModalOpened: boolean
    updatePostDto: IPost
}

const initialState: InitialState = {
    isAddPostModalOpened: false,
    isUpdatePostModalOpened: false,
    isSearchModal: false,
    searchValue: '',
    updatePostDto: {
        title: '',
        plot: '',
        userId: '',
        likes: 0,
        postId: 0
    }
}

export const InterfaceSLice = createSlice({
    name: 'interfaceSlice',
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.isAddPostModalOpened = !state.isAddPostModalOpened;
        },
        toggleSearchModal: (state) => {
            state.isSearchModal = !state.isSearchModal
            state.searchValue = ''
        },
        changeSearch: (state, action) => {
            state.searchValue = action.payload
        },
        toggleUpdateModal: (state) => {
            if (state.isUpdatePostModalOpened) {
                state.isUpdatePostModalOpened = false
            } else {
                state.isAddPostModalOpened = false
                state.isSearchModal = false
                state.isUpdatePostModalOpened = true
            }
        },
        setUpdatePostDto: (state, action) => {
            state.updatePostDto = action.payload.updatePostDto
        }
    }
})

export const {toggleModal, toggleSearchModal, changeSearch, toggleUpdateModal, setUpdatePostDto} = InterfaceSLice.actions;
export default InterfaceSLice.reducer;