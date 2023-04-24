import { IComment, ICreateComment, ICreatePost, IPost } from '../../types/types'
import { apiSlice } from './apiSlice'

const postsSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getAllPosts: build.query<{ page: IPost[]; pages: number }, number>({
			query: (pageNum) => ({
				url: `/post/selectall/?pageNum=${pageNum}`,
			}),
			providesTags: ['App'],
			merge: (currentCache, newItems) => {
				currentCache.page.push(...newItems.page)
			},
			forceRefetch: ({ currentArg, previousArg }) => {
				return currentArg !== previousArg
			},
		}),
		getUserPosts: build.query<IPost[], string>({
			query: (userId) => ({
				url: `/post/selectuserposts/?userId=${userId}`,
			}),
			providesTags: ['App'],
		}),
		getPostById: build.query<IPost, number>({
			query: (postId) => ({
				url: `/post/selectbyid?postId=${postId}`,
			}),
			providesTags: (result, error, arg) =>
				result ? [{ type: 'App', id: arg }, {type: 'App'}] : ['App'],
		}),
		getPostsByTitle: build.query<IPost[], string>({
			query: (postTitle) => ({
				url: `/post/selectbytitle/?querry=${postTitle}`,
			}),
			providesTags: ['App'],
		}),
		createPost: build.mutation<ICreatePost, ICreatePost>({
			query: (body) => ({
				url: 'post/createpost',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['App'],
		}),
		updatePost: build.mutation<
			IPost,
			{ postId: number; body: ICreatePost }
		>({
			query: (body) => ({
				url: `post/updatepost/?postId=${body.postId}`,
				method: 'POST',
				body: body.body,
			}),
			invalidatesTags: ['App'],
		}),
		likePost: build.mutation<string, number>({
			query: (postid: number) => ({
				url: `/like/likeaction/?postId=${postid}`,
				method: 'POST',
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'App', id: arg }],
		}),
		checkLike: build.query({
			query: (postId: number) => ({
				url: `/like/isliked/?postId=${postId}`,
			}),
			providesTags: (res, err, id) => [{type: 'App'}, {type: 'App', id}],
		}),

		deletePost: build.mutation({
			query: (postId: number) => ({
				url: `post/deletepost/?postId=${postId}`,
				method: 'POST',
			}),
			invalidatesTags: ['App'],
		}),
	}),
})

export const {
	useGetAllPostsQuery,
	useGetPostsByTitleQuery,
	useGetPostByIdQuery,
	useCreatePostMutation,
	useLikePostMutation,
	useCheckLikeQuery,
	useGetUserPostsQuery,
	useDeletePostMutation,
	useUpdatePostMutation,
} = postsSlice
