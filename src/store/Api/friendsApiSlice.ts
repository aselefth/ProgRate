import { apiSlice } from './apiSlice'

export const friendsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getFriends: build.query({
            query: () => ({
                url: '/friend/getfriends'
            }),
            providesTags: ['App']
        }),
        getFriendRequests: build.query({
            query: () => ({
                url: '/request/getrequests'
            }),
            providesTags: ['App']
        }),
        sendFriendRequest: build.mutation({
            query: (userId: string) => ({
                url: `/request/addrequest/?targetUserId=${userId}`,
                method: 'POST',
            }),
            invalidatesTags: ['App'],
        }),
        rejectFriendRequest: build.mutation({
            query: (requestId: number) => ({
                url: `/request/reject/?requestId=${requestId}`,
                method: 'POST',
            }),
            invalidatesTags: ['App'],
        }),
        acceptFriendRequest: build.mutation({
            query: (requestId: number) => ({
                url: `/request/accept/?requestId=${requestId}`,
                method: 'POST',
            }),
            invalidatesTags: ['App'],
        }),
    }),
})

export const {
    useSendFriendRequestMutation,
    useRejectFriendRequestMutation,
    useAcceptFriendRequestMutation,
    useGetFriendRequestsQuery,
    useGetFriendsQuery
} = friendsApiSlice
