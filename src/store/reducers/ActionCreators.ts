import axios from "axios";
import { API_URL } from "../../constants/api.ts";
import { AxiosParams } from "../../types/axiiosParams.ts";
import { productsSlice } from "./ProductsSlice.ts";
import { AppDispatch } from "../store.ts";
import {
  removeDuplicatesId,
  removeDuplicatesProducts,
  setHeadersAuth,
} from "../../assets/functions.ts";
import { IProduct } from "../../types/IProduct.ts";

const setHeaders = () => ({
  headers: {
    "X-Auth": setHeadersAuth(),
  },
});

const requestProducts = async (params: AxiosParams) => {
  try {
    return await axios.post(API_URL, params, setHeaders());
  } catch (e) {
    await requestProducts(params);
  }
};

export const fetchProductsIds =
  (params: AxiosParams) => async (dispatch: AppDispatch) => {
    const filtersRequest: string[][] = [];
    try {
      dispatch(productsSlice.actions.productsFetching(1));
      const response = await requestProducts(params);
      if (response?.status === 200) {
        dispatch(
          productsSlice.actions.productsIdsFetchingSuccess(
            removeDuplicatesId(response.data.result),
          ),
        );
        dispatch(
          fetchProductsItems({
            action: "get_items",
            params: { ids: response.data.result.slice(0, 50) },
          }),
        );
        // for (let i = 0; i < Math.ceil(response.data.result.length / 50); i++) {
        for (let i = 0; i < 10; i++) {
          filtersRequest.push(response.data.result.slice(i * 50, (i + 1) * 50));
        }
      }

      const filterSingleRequest = filtersRequest.map((request: string[]) =>
        requestProducts({ action: "get_items", params: { ids: request } }),
      );
      Promise.allSettled(filterSingleRequest).then((response) => {
        const brands: string[] = [];
        let minPrice = 0;
        let maxPrice = 0;
        response.forEach((resp) => {
          if (resp?.status === "fulfilled" && resp?.value?.data.result.length) {
            resp.value.data.result.forEach((item: IProduct) => {
              if (item.brand !== null && !brands.includes(item.brand)) {
                brands.push(item.brand);
              }
              if (minPrice === 0) {
                minPrice = item.price;
              } else {
                if (item.price < minPrice) {
                  minPrice = item.price;
                }
              }
              if (maxPrice === 0) {
                maxPrice = item.price;
              } else {
                if (item.price > maxPrice) {
                  maxPrice = item.price;
                }
              }
            });
          }
        });
        dispatch(
          productsSlice.actions.setFilter({
            brands,
            minPrice,
            maxPrice,
          }),
        );
      });
    } catch (e: unknown) {
      dispatch(
        productsSlice.actions.productsFetchingError("Ошибка получения данных"),
      );
      dispatch(fetchProductsIds(params));
    }
  };

export const fetchProductsItems =
  (params: AxiosParams) => async (dispatch: AppDispatch) => {
    try {
      dispatch(productsSlice.actions.productsFetching(1));
      const response = await requestProducts(params);
      if (response?.status === 200) {
        dispatch(
          productsSlice.actions.pageProductsFetchingSuccess(
            removeDuplicatesProducts(response.data.result),
          ),
        );
      }
    } catch (e: unknown) {
      dispatch(
        productsSlice.actions.productsFetchingError("Ошибка получения данных"),
      );
      console.log("ошибка получения данных страницы");
      dispatch(fetchProductsItems(params));
    }
  };
