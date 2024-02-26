import {IProduct} from "../../types/IProduct.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IProductItem {
  [key: string]: any;
}
interface IProductsState {
  products: string[];
  isLoading: boolean;
  error: string;
  length: number;
  pageProducts: IProductItem[];
  paginationCount: number;
}

const initialState: IProductsState = {
  products: [],
  isLoading: false,
  error: '',
  length: 0,
  pageProducts: [],
  paginationCount: 1,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsFetching(state) {
      state.isLoading = true;
      state.error = '';
      state.length = 0
    },
    productsFetchingSuccess(state, action: PayloadAction<str[]>) {
      state.isLoading = false;
      state.error = '';
      state.products = action.payload;
      state.length = action.payload.length;
    },
    pageProductsFetchingSuccess(state, action: PayloadAction<IProductItem[]>) {
      console.log(action.payload)

      state.isLoading = false;
      state.error = '';
      state.pageProducts = action.payload;
    },
    productsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPaginationCount(state, action: PayloadAction<number>) {
      console.log(action.payload)
      // if(action.payload < 1) {
      //   state.paginationCount = 1
      // } else if(action.payload > Math.ceil(state.length / 50)) {
      //   state.paginationCount = Math.ceil(state.length / 50)
      // } else {
        state.paginationCount = action.payload;

      // }
    }
  }
})

export default productsSlice.reducer