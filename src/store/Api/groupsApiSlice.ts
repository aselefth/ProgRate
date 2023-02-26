import { apiSlice } from "./apiSlice";

const groupsApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        getGroups: build.query({
            query: () => ({
                url: '/group'
            }),
            providesTags: ['Chat']
        }),
        createGroup: build.mutation<undefined, string>({
            query: (groupName) => ({
                url: `/group?groupName=${groupName}`,
                method: 'POST'
            }),
            invalidatesTags: ['Chat']
        })
    })
})

export const { useGetGroupsQuery, useCreateGroupMutation } = groupsApiSlice