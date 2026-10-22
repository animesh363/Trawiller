import { apiSlice } from '../../api/apiSlice';

export const listingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Unified explore query
    getExploreListings: builder.query({
      query: (params) => ({
        url: '/explore',
        params,
      }),
      providesTags: ['Hotel', 'Restaurant', 'Activity', 'Taxi'],
    }),

    // Hotel endpoints
    getHotels: builder.query({
      query: (params) => ({
        url: '/hotels',
        params,
      }),
      providesTags: ['Hotel'],
    }),
    getMyHotels: builder.query({
      query: () => '/hotels/vendor/my-hotels',
      providesTags: ['Hotel'],
    }),
    getHotelById: builder.query({
      query: (id) => `/hotels/${id}`,
      providesTags: (result, error, id) => [{ type: 'Hotel', id }],
    }),
    createHotel: builder.mutation({
      query: (data) => ({
        url: '/hotels',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Hotel'],
    }),
    addRoom: builder.mutation({
      query: ({ hotelId, ...data }) => ({
        url: `/hotels/${hotelId}/rooms`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Hotel'],
    }),

    // Restaurant endpoints
    getRestaurants: builder.query({
      query: (params) => ({
        url: '/restaurants',
        params,
      }),
      providesTags: ['Restaurant'],
    }),
    getMyRestaurants: builder.query({
      query: () => '/restaurants/vendor/my-restaurants',
      providesTags: ['Restaurant'],
    }),
    getRestaurantById: builder.query({
      query: (id) => `/restaurants/${id}`,
      providesTags: (result, error, id) => [{ type: 'Restaurant', id }],
    }),
    createRestaurant: builder.mutation({
      query: (data) => ({
        url: '/restaurants',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Restaurant'],
    }),

    // Activity & Yoga endpoints
    getActivities: builder.query({
      query: (params) => ({
        url: '/activities',
        params,
      }),
      providesTags: ['Activity'],
    }),
    getMyActivities: builder.query({
      query: () => '/activities/vendor/my-activities',
      providesTags: ['Activity'],
    }),
    getActivityById: builder.query({
      query: (id) => `/activities/${id}`,
      providesTags: (result, error, id) => [{ type: 'Activity', id }],
    }),
    createActivity: builder.mutation({
      query: (data) => ({
        url: '/activities',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Activity'],
    }),

    // Taxi endpoints
    getTaxis: builder.query({
      query: (params) => ({
        url: '/taxis',
        params,
      }),
      providesTags: ['Taxi'],
    }),
    getMyTaxis: builder.query({
      query: () => '/taxis/vendor/my-taxis',
      providesTags: ['Taxi'],
    }),
    getTaxiById: builder.query({
      query: (id) => `/taxis/${id}`,
      providesTags: (result, error, id) => [{ type: 'Taxi', id }],
    }),
    createTaxi: builder.mutation({
      query: (data) => ({
        url: '/taxis',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Taxi'],
    }),
  }),
});

export const {
  useGetExploreListingsQuery,
  useGetHotelsQuery,
  useGetMyHotelsQuery,
  useGetHotelByIdQuery,
  useCreateHotelMutation,
  useAddRoomMutation,
  useGetRestaurantsQuery,
  useGetMyRestaurantsQuery,
  useGetRestaurantByIdQuery,
  useCreateRestaurantMutation,
  useGetActivitiesQuery,
  useGetMyActivitiesQuery,
  useGetActivityByIdQuery,
  useCreateActivityMutation,
  useGetTaxisQuery,
  useGetMyTaxisQuery,
  useGetTaxiByIdQuery,
  useCreateTaxiMutation,
} = listingsApi;
