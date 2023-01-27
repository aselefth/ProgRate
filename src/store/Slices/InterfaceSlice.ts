import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
    isAddPostModalOpened: boolean
}

const initialState: InitialState = {
    isAddPostModalOpened: false,
}

export const InterfaceSLice = createSlice({
    name: 'interfaceSlice',
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.isAddPostModalOpened = !state.isAddPostModalOpened;
        },
    }
})

export const {toggleModal} = InterfaceSLice.actions;
export default InterfaceSLice.reducer;