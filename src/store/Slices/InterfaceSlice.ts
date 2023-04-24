import { createSlice } from "@reduxjs/toolkit";
import { ICreatePost, IPost } from "../../types/types";

export interface InitialState {
    isSearchModal: boolean
    searchValue: string
    updatePostDto: IPost
}

const initialState: InitialState = {
    isSearchModal: false,
    searchValue: '',
    updatePostDto: {
        title: '',
        plot: '',
        userId: '',
        likes: 0,
        postId: 0,
        pictureBase: null
    }
}

export const InterfaceSLice = createSlice({
    name: 'interfaceSlice',
    initialState,
    reducers: {
        toggleSearchModal: (state) => {
            state.isSearchModal = !state.isSearchModal
            state.searchValue = ''
        },
        changeSearch: (state, action) => {
            state.searchValue = action.payload
        },
        setUpdatePostDto: (state, action) => {
            state.updatePostDto = action.payload.updatePostDto
        }
    }
})

export const {toggleSearchModal, changeSearch, setUpdatePostDto} = InterfaceSLice.actions;
export default InterfaceSLice.reducer;