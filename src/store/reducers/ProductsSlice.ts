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
}

const initialState: IProductsState = {
  products: [],
  isLoading: false,
  error: '',
  lastPage: 0,
  pageProducts: [],
  currentPage: 1,
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
      console.log('setCount', action.payload)
      // if(action.payload < 1) {
      //   state.paginationCount = 1
      // } else if(action.payload > Math.ceil(state.length / 50)) {
      //   state.paginationCount = Math.ceil(state.length / 50)
      // } else {
        state.currentPage = action.payload;

      // }
    }
  }
})

export default productsSlice.reducer