import { IFriend, IFriendRequest } from '../../types/types'
import { apiSlice } from './apiSlice'

const friendsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getFriends: build.query<IFriend[], undefined>({
            query: () => ({
                url: '/friend/getfriends'
            }),
            providesTags: ['App']
        }),
        deleteFriend: build.mutation({
            query: (deletedId: string) => ({
                url: `/friend/deletefriend?deletedId=${deletedId}`,
                method: 'POST'
            }),
            invalidatesTags: ['App']
        }),
        getFriendRequests: build.query<IFriendRequest[], undefined>({
            query: () => ({
                url: '/request/getrequests'
            }),
            providesTags: ['App']
        }),
        sendFriendRequest: build.mutation({
            query: (userId: string) => ({
                url: `/request/addrequest?targerUserId=${userId}`,
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
                url: `/request/accept?requestId=${requestId}`,
                method: 'POST',
            }),
            invalidatesTags: ['App'],
        }),
        deleteFriendRequest: build.mutation({
            query: (requestId: number) => ({
                url: `/request/deleterequest?requestId=${requestId}`,
                method: 'POST'
            })
        })
    }),
})

export const {
    useSendFriendRequestMutation,
    useRejectFriendRequestMutation,
    useAcceptFriendRequestMutation,
    useGetFriendRequestsQuery,
    useLazyGetFriendRequestsQuery,
    useGetFriendsQuery,
    useDeleteFriendMutation,
    useDeleteFriendRequestMutation
} = friendsApiSlice
