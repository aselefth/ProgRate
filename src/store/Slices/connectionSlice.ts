import {
    HttpTransportType,
    HubConnection,
    HubConnectionBuilder,
} from '@microsoft/signalr'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
    connection: HubConnection
    groupName: string
}

const initialState: InitialState = {
    connection: new HubConnectionBuilder()
        .withUrl('http://localhost:8080/hubs/chat', {
            // skipNegotiation: true,
            // transport: HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .build(),
    groupName: '',
}

export const connectionSlice = createSlice({
    name: 'connectionSlice',
    initialState,
    reducers: {
        setGroupName: (state, action: PayloadAction<{ groupName: string }>) => {
            state.groupName = action.payload.groupName
        },
    },
})

export const { setGroupName } = connectionSlice.actions
export default connectionSlice.reducer
