import { IUser, IUserLogin, IUserUpdate } from '../../types/types';
import { apiSlice } from './apiSlice';

const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getUser: build.query<IUser, undefined>({
			query: () => ({
				url: '/user/getuser'
			}),
			providesTags: ['App']
		}),
		getUserById: build.query<IUser, string>({
			query: (id: string) => ({
				url: `/user/getuserbyid/?Id=${id}`
			}),
			providesTags: ['App']
		}),
		registerUser: build.mutation<
			{ data: { errors: string[]; succeeded: boolean } },
			IUserLogin
		>({
			query: (body: IUserLogin) => ({
				url: '/user/register',
				body,
				method: 'POST'
			}),
			invalidatesTags: ['App']
		}),
		changeUser: build.mutation<IUser, IUserUpdate>({
			query: (body) => ({
				url: `user/updateuser`,
				method: 'POST',
				body
			}),
			invalidatesTags: ['App']
		})
	})
});

export const {
	useLazyGetUserQuery,
	useGetUserQuery,
	useGetUserByIdQuery,
	useRegisterUserMutation,
	useChangeUserMutation
} = userApiSlice;
