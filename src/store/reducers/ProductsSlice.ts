import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";

interface IProductItem {
  [key: string]: any;
}
interface IProductsState {
  products: string[];
  isLoading: boolean;
  error: string;
  lastPage: number;
  pageProducts: IProductItem[];
  currentPage: number;
  pages: IProductItem[][];
  filters: {
    brands: string[],
    minPrice: number,
    maxPrice: number,
  }
}

const initialState: IProductsState = {
  products: [],
  isLoading: false,
  error: '',
  lastPage: 0,
  pageProducts: [],
  pages: [],
  currentPage: 1,
  filters: {
    brands: [],
    minPrice: 0,
    maxPrice: 0,
  }
}

export const productsSlice: Slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsFetching(state) {
      state.isLoading = true;
      state.error = '';
    },
    productsIdsFetchingSuccess(state, action: PayloadAction<string[]>) {
      // console.log(action.payload.length / 50)
      state.isLoading = false;
      state.error = '';
      state.products = action.payload;
      state.lastPage = action.payload.length / 50;
    },
    pageProductsFetchingSuccess(state, action: PayloadAction<IProductItem[]>) {
      state.isLoading = false;
      state.error = '';
      state.pageProducts = action.payload;
    },
    productsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPaginationCount(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilter(state, action: PayloadAction) {
      state.filters = action.payload;
    },
  }
})

export default productsSlice.reducer