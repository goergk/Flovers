import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface RootObject_1 {
    florists: Florist[];
    length: number;
}

export interface Owner {
    id: number;
    username: string;
    date_joined: Date;
}

export interface Flower {
    id: number;
    name: string;
    price: string;
    amount: number;
    creation_date: Date;
}
export interface Bouquet {
    id: number;
    name: string;
    flowers: Flower[];
    creation_date: Date;
}

export interface Delivery {
    id: number;
    flowers: Flower[];
    date: Date;
}

export interface BouquetObject {
    id: number;
    bouquet: Bouquet;
    amount: number;
}

export interface Sale {
    id: number;
    flowers: Flower[];
    bouquets: BouquetObject[];
    creation_date: Date;
}

export interface Florist {
    id: number;
    name: string;
    owner: Owner;
    flowers: Flower[];
    bouquets: Bouquet[];
    deliveries: Delivery[];
    sales: Sale[];
}

export interface RootObject {
    florist: Florist[];
}

const baseUrl: string = 'http://127.0.0.1:8000/api';

export const FloristsApi = createApi({
    reducerPath: 'eventsAPI',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getFlorists: builder.query<RootObject_1, number>({
            query: (id) => ({
                url: `${baseUrl}/florists/${id}/`,
                headers: {
                    'authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            })
        }),
        getFlorist: builder.query<RootObject, number>({
            query: (id) => ({
                url: `${baseUrl}/florist/${id}`,
                headers: {
                    'authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            })
        }),
    })
});

export const { 
    useGetFloristsQuery,
    useGetFloristQuery
} = FloristsApi;



