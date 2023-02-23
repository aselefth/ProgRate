import { apiSlice } from "./apiSlice";

const messagesApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        getMessages: build.query({
            query: () => ({
                url: '/chat'
            }),
            providesTags: ['Chat']
        }),
        sendMessage: build.mutation<undefined, {message: string}>({
            query: (message) => ({
                url: '/chat',
                body: message,
                method: 'POST'
            }),
            invalidatesTags: ['Chat']
        })
    })
})

export const {useGetMessagesQuery, useLazyGetMessagesQuery, useSendMessageMutation} = messagesApiSlice