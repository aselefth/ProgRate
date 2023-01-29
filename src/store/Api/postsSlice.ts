import { IComment, ICreateComment, ICreatePost, IPost } from "../../types/types"
import { apiSlice } from "./apiSlice"

const postsSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllPosts: build.query<{page: IPost[], pages: number}, number>({
            query: (pageNum) => ({
                url: `/post/selectall/?pageNum=${pageNum}`,
            }),
            providesTags: ["App"],
        }),
        getUserPosts: build.query<IPost[], string>({
            query: (userId) => ({
                url: `/post/selectuserposts/?userId=${userId}`
            }),
            providesTags: ["App"],
        }),
        getPostById: build.query<IPost, number>({
            query: (postId) => ({
                url: `/post/selectbyid/?postId=${postId}`,
            }),
            providesTags: ["App"],
        }),
        createPost: build.mutation<ICreatePost, ICreatePost>({
            query: (body) => ({
                url: "post/createpost",
                method: "POST",
                body,
            }),
            invalidatesTags: ["App"],
        }),
        likePost: build.mutation<string, number>({
            query: (postid: number) => ({
                url: `/like/likeaction/?postId=${postid}`,
                method: "POST",
            }),
            invalidatesTags: ["App"],
        }),
        checkLike: build.query({
            query: (postId: number) => ({
                url: `/like/isliked/?postId=${postId}`,
            }),
            providesTags: ["App"],
        }),
        getComments: build.query<IComment[], number>({
            query: (postId) => ({
                url: `/comment/getpostcomments/?postId=${postId}`,
            }),
            providesTags: ["App"],
        }),
        addComment: build.mutation<IComment, ICreateComment>({
            query: (body) => ({
                url: `/comment/addcomment/?postId=${body.postId}`,
                body: body.comment,
                method: "POST",
            }),
            invalidatesTags: ["App"],
        }),
        deletePost: build.mutation({
            query: (postId: number) => ({
                url: `post/deletepost/?postId=${postId}`,
                method: 'POST'
            }),
            invalidatesTags: ["App"],
        })
    }),
})

export const {
    useGetAllPostsQuery,
    useGetPostByIdQuery,
    useCreatePostMutation,
    useLikePostMutation,
    useCheckLikeQuery,
    useGetCommentsQuery,
    useAddCommentMutation,
    useGetUserPostsQuery,
    useDeletePostMutation
} = postsSlice
