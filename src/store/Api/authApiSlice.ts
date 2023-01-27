import { IUserLogin } from "../../types/types"
import { apiSlice } from "./apiSlice"

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (credentials: IUserLogin) => ({
                url: "/user/login",
                method: "POST",
                body: JSON.stringify(credentials),
            }),
        }),
    }),
})

export const { useLoginMutation } = authApiSlice
