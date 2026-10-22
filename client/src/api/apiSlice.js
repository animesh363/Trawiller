import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK Query Base API Slice with httpOnly credentials
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    credentials: 'include',
  }),
  tagTypes: [
    'User',
    'VendorProfile',
    'Hotel',
    'Room',
    'Restaurant',
    'Dish',
    'Taxi',
    'Activity',
    'Booking',
    'Review',
    'Destination',
  ],
  endpoints: (builder) => ({}),
});
