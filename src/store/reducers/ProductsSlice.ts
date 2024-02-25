import {IProduct} from "../../types/IProduct.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ProductsState {
  products: string[];
  isLoading: boolean;
  error: string
  length: number
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: '',
  length: 0,
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
    productsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})

export default productsSlice.reducer