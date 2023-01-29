import { IUser, IUserLogin } from "../../types/types";
import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query<{fullName: string, userName: string, email: string, userId: string}, undefined>({
            query: () => ({
                url: '/user/getuser'
            }),
            providesTags: ["App"]
        }),
        getUserById: build.query<IUser, string>({
            query: (id: string) => ({
                url: `/user/getuserbyid/?Id=${id}`
            }),
            providesTags: ["App"]
        }),
        registerUser: build.mutation({
            query: (body: IUserLogin) => ({
                url: '/user/register',
                body,
                method: 'POST'
            })
        })
    })
})

export const {useGetUserQuery, useGetUserByIdQuery, useRegisterUserMutation} = userApiSlice