import {IProduct} from "../../types/IProduct.ts";
import {createSlice} from "@reduxjs/toolkit";

interface ProductsState {
  products: IProduct[];
  isLoading: boolean;
  error: string
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: '',
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

  }
})

export default productsSlice.reducer