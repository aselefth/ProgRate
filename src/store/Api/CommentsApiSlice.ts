import { IComment, ICreateComment } from "../../types/types";
import { apiSlice } from "./apiSlice";

const commentsApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        getComments: build.query<IComment[], number>({
            query: (postId) => ({
                url: `/comment/getpostcomments/?postId=${postId}`,
            }),
            providesTags: ["App"],
        }),
        addComment: build.mutation<IComment, ICreateComment>({
            query: (body) => ({
                url: `/comment/addcomment/?postId=${body.postId}`, 
                method: "POST",
                body: body.comment,
            }),
            invalidatesTags: ["App"],
        }),
    })
})

export const {useAddCommentMutation, useGetCommentsQuery} = commentsApiSlice