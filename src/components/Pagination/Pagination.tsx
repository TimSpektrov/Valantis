import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import './pagination.scss'
import {fetchProductsItems} from "../../store/reducers/ActionCreators.ts";
import {productsSlice} from "../../store/reducers/ProductsSlice.ts";

const Pagination = () => {
  const dispatch = useAppDispatch()
  const {paginationCount, length, products} = useAppSelector(state => state.productReducer)
  console.log(length)
  const handleClick = (e) => {
    console.log(e)
    dispatch(productsSlice.actions.setPaginationCount(paginationCount + e))
    dispatch(fetchProductsItems({
      action: 'get_items', params: {ids: products.slice(((paginationCount + e - 1) * 50),(paginationCount + e) * 50)}
    }))
  }
  return (
    <div className="pagination">
      <button
        className="pagination__button btn-first"
        // disabled={paginationCount === 1}
        onClick={() =>handleClick( 1)}
      ></button>
      <button
        className="pagination__button btn-prev"
        // disabled={paginationCount === 1}
        onClick={() =>handleClick(paginationCount - 1)}
      ></button>
      <div
        className="pagination__button pagination__page"

      >{paginationCount}</div>
      <button
        className="pagination__button btn-next"
        // disabled={paginationCount === Math.ceil(length / 50)}
        onClick={() =>handleClick( paginationCount + 1)}
      ></button>
      <button
        className="pagination__button btn-last"
        // disabled={paginationCount === Math.ceil(length / 50)}
        onClick={() =>handleClick( Math.ceil(length / 50))}
      ></button>
    </div>
  );
};

export default Pagination;