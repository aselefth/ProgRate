import { IMessage } from "../../types/types";
import { apiSlice } from "./apiSlice";

const messagesApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        getMessages: build.query<IMessage[], string>({
            query: (groupName) => ({
                url: `/chat?group=${groupName}`
            }),
            providesTags: ['Chat']
        }),
        sendMessage: build.mutation<undefined, {message: string, groupName: string}>({
            query: (body) => ({
                url: `/chat?group=${body.groupName}`,
                body: {message: body.message},
                method: 'POST'
            }),
            invalidatesTags: ['Chat']
        })
    })
})

export const {useGetMessagesQuery, useLazyGetMessagesQuery, useSendMessageMutation} = messagesApiSlice