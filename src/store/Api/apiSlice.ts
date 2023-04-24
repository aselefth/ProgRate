import { createApi } from "@reduxjs/toolkit/query/react"
import { BaseQueryApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { logOut, setCredentials } from "../Slices/authSlice"
import { RootState } from "../store"

const baseQuery = fetchBaseQuery({
    baseUrl: "http://172.20.10.2:8080/api",
    mode: "cors",
    credentials: "include",
    prepareHeaders: (headers, { getState }: Pick<BaseQueryApi, "getState">) => {
        headers.set("Content-Type", "application/json; charset=UTF-8")
        const token = (getState() as RootState).authSlice.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === "FETCH_ERROR") {
        console.log("sending refresh token")
        const refreshResult = await baseQuery(
            "http://localhost:8080/api/user/login",
            api,
            extraOptions
        )
        console.log(refreshResult)
        if (refreshResult?.data) {
            console.log(refreshResult)
            api.dispatch(setCredentials({ ...refreshResult.data }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result
}

export const apiSlice = createApi({
    reducerPath: "apiSlice",
    tagTypes: ["App", 'Chat'],
    baseQuery: baseQuery,
    endpoints: () => ({}),
})
