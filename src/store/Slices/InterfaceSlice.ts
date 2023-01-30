import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
    isAddPostModalOpened: boolean
    isSearchModal: boolean
    searchValue: string
}

const initialState: InitialState = {
    isAddPostModalOpened: false,
    isSearchModal: false,
    searchValue: ''
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
        }
    }
})

export const {toggleModal, toggleSearchModal, changeSearch} = InterfaceSLice.actions;
export default InterfaceSLice.reducer;