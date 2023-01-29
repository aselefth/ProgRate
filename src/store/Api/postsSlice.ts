import { IComment, ICreateComment, ICreatePost, IPost } from "../../types/types"
import { apiSlice } from "./apiSlice"

const postsSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllPosts: build.query<{page: IPost[], pages: number}, number>({
            query: (pageNum) => ({
                url: `/post/selectall/?pageNum=${pageNum}`,
            }),
            providesTags: [{ type: "App", id: 'Post' }],
        }),
        getUserPosts: build.query<IPost[], string>({
            query: (userId) => ({
                url: `/post/selectuserposts/?userId=${userId}`
            }),
            providesTags: [{ type: "App", id: "Post" }],
        }),
        getPostById: build.query<IPost, number>({
            query: (postId) => ({
                url: `/post/selectbyid/?postId=${postId}`,
            }),
            providesTags: [{ type: "App", id: "Post" }],
        }),
        createPost: build.mutation<ICreatePost, ICreatePost>({
            query: (body) => ({
                url: "post/createpost",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "App", id: "Post" }],
        }),
        likePost: build.mutation<string, number>({
            query: (postid: number) => ({
                url: `/like/likeaction/?postId=${postid}`,
                method: "POST",
            }),
            invalidatesTags: [{ type: "App", id: "Post" }],
        }),
        checkLike: build.query({
            query: (postId: number) => ({
                url: `/like/isliked/?postId=${postId}`,
            }),
            providesTags: [{ type: "App", id: 'Post' }],
        }),
        getComments: build.query<IComment[], number>({
            query: (postId) => ({
                url: `/comment/getpostcomments/?postId=${postId}`,
            }),
            providesTags: [{ type: "App", id: "Comments" }],
        }),
        addComment: build.mutation<IComment, ICreateComment>({
            query: (body) => ({
                url: `/comment/addcomment/?postId=${body.postId}`,
                body: body.comment,
                method: "POST",
            }),
            invalidatesTags: [{ type: "App", id: "Comments" }],
        }),
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
    useGetUserPostsQuery
} = postsSlice
