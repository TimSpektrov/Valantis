// import {AppDispatch} from "../store.ts";
import axios from "axios";
import {API_URL, PASSWORD} from "../../constants/api.ts";
import {AxiosParams} from "../../types/axiiosParams.ts";
import md5 from "md5";
import {productsSlice} from "./ProductsSlice.ts";
import {AppDispatch} from "../store.ts";

export const fetchProducts = (params: AxiosParams) => async (dispatch: AppDispatch) => {
  console.log()
  const headers = {
    headers: {
      'X-Auth': md5(`${PASSWORD}_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`)
    }
  }
  try {
    dispatch(productsSlice.actions.productsFetching())

    const response = await axios.post(
      API_URL,
      params,
      headers
    )
    dispatch(productsSlice.actions.productsFetchingSuccess(response.data.result))
  } catch (e: Error) {
    dispatch(productsSlice.actions.productsFetchingError('Ошибка получения данных'))
  }
}

