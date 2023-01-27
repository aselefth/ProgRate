import { IComment, ICreateComment, ICreatePost, IPost } from "../../types/types"
import { apiSlice } from "./apiSlice"

const postsSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllPosts: build.query<IPost[], undefined>({
            query: () => ({
                url: "/post/selectall",
            }),
            providesTags: [{ type: "App", id: "Posts" }],
        }),
        createPost: build.mutation<ICreatePost, ICreatePost>({
            query: (body) => ({
                url: "post/createpost",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "App", id: "Posts" }],
        }),
        likePost: build.mutation<string, number>({
            query: (postid: number) => ({
                url: `/like/likeaction/?postId=${postid}`,
                method: "POST",
            }),
            invalidatesTags: [{ type: "App", id: "Posts" }],
        }),
        checkLike: build.query({
            query: (postId: number) => ({
                url: `/like/isliked/?postId=${postId}`,
            }),
            providesTags: [{ type: "App", id: "Posts" }],
        }),
        getComments: build.query<IComment[], number>({
            query: (postId) => ({
                url: `/comment/getpostcomments/?postId=${postId}`,
            }),
            providesTags: [{ type: "App", id: "Posts" }],
        }),
        addComment: build.mutation<IComment, ICreateComment>({
            query: (body) => ({
                url: `/comment/addcomment/?postId=${body.postId}`,
                body: body.comment,
                method: "POST",
            }),
            invalidatesTags: [{ type: "App", id: "Posts" }],
        }),
    }),
})

export const {
    useGetAllPostsQuery,
    useCreatePostMutation,
    useLikePostMutation,
    useCheckLikeQuery,
    useGetCommentsQuery,
    useAddCommentMutation,
} = postsSlice
