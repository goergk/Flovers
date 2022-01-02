import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Florist {
    id: number;
    name: string;
    owner: number;
}

export interface RootObject {
    florists: Florist[];
    length: number;
}

const baseUrl: string = 'http://127.0.0.1:8000/api';

export const FloristsApi = createApi({
    reducerPath: 'eventsAPI',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getFlorists: builder.query<RootObject, number>({
            query: (id) => ({
                url: `${baseUrl}/florists/${id}`,
                headers: {
                    'authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            })
        }),
    })
});

export const { 
    useGetFloristsQuery
} = FloristsApi;



