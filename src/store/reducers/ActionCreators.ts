import axios from "axios";
import {API_URL} from "../../constants/api.ts";
import {AxiosParams} from "../../types/axiiosParams.ts";
import {productsSlice} from "./ProductsSlice.ts";
import {AppDispatch} from "../store.ts";
import {
  removeDuplicatesId,
  removeDuplicatesProducts,
  setHeadersAuth
} from "../../assets/functions.ts";

const setHeaders = () => ({
  headers: {
    'X-Auth': setHeadersAuth()
  }
})

const requestProducts = async (params: AxiosParams) => {
  return await axios.post(
    API_URL,
    params,
    setHeaders()
  )
}

export const fetchProductsIds = (params: AxiosParams) => async (dispatch: AppDispatch) => {
  try {
    dispatch(productsSlice.actions.productsFetching())
    const response = await requestProducts(params)
    dispatch(productsSlice.actions.productsIdsFetchingSuccess(removeDuplicatesId(response.data.result)))

    dispatch(fetchProductsItems({action: 'get_items', params: {ids: response.data.result.slice(0,50)}}))
  } catch (e: Error) {
    dispatch(productsSlice.actions.productsFetchingError('Ошибка получения данных'))
    console.log('ошибка получения id')
    dispatch(fetchProductsIds(params))
  }
}

export const fetchProductsItems = (params: AxiosParams) => async (dispatch: AppDispatch) => {
  console.log(params)
  try {
    dispatch(productsSlice.actions.productsFetching())

    const response = await requestProducts(params)

    dispatch(productsSlice.actions.pageProductsFetchingSuccess(removeDuplicatesProducts(response.data.result)))
  } catch (e: unknown) {
    dispatch(productsSlice.actions.productsFetchingError('Ошибка получения данных'))
    console.log('ошибка получения данных страницы')
    dispatch(fetchProductsItems(params))
  }
}