// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
// import {API_URL, PASSWORD} from "../constants/api.ts";
// import md5 from "md5";
// import {AxiosParams} from "../types/axiiosParams.ts";
// import {setHeadersAuth} from "../assets/functions.ts";
//
// export const productsAPI = createApi({
//   reducerPath: 'productsAPI',
//   baseQuery: fetchBaseQuery(
//     {baseUrl: API_URL}),
//     endpoints: (build) => ({
//       fetchAllProducts: build.mutation({
//         query: (params: AxiosParams) => ({
//           url: '',
//           method: 'POST',
//           params,
//           headers: {
//             'X-Auth': setHeadersAuth()
//           }
//         })
//       }),
//       fetchIdProduct: build.mutation({
//         query: (params: AxiosParams)=> ({
//           url: '',
//           method: 'POST',
//           params,
//           headers: {
//             'X-Auth': md5(`${PASSWORD}_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`)
//           }
//         }),
//       }),
//
//   })
// })