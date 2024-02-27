import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import './pagination.scss'
// import {fetchProductsItems} from "../../store/reducers/ActionCreators.ts";
import {productsSlice} from "../../store/reducers/ProductsSlice.ts";
import {fetchProductsItems} from "../../store/reducers/ActionCreators.ts";

const Pagination = () => {
  const dispatch = useAppDispatch()
  const {currentPage, lastPage, products} = useAppSelector(state => state.productReducer)
  const handleClick = (e:number) => {
    dispatch(productsSlice.actions.setPaginationCount(e))
    dispatch(fetchProductsItems({
      action: 'get_items', params: {ids: products.slice(((e - 1) * 50),e * 50)}
    }))
  }
  return (
    <div className="pagination">
      <button
        className="pagination__button btn-first"
        disabled={currentPage === 1}
        onClick={() =>handleClick( 1)}
      ></button>
      <button
        className="pagination__button btn-prev"
        disabled={currentPage === 1}
        onClick={() =>handleClick(currentPage - 1)}
      ></button>
      <div
        className="pagination__button pagination__page"

      >{currentPage}</div>
      <button
        className="pagination__button btn-next"
        disabled={currentPage === lastPage}
        onClick={() =>handleClick( currentPage + 1)}
      ></button>
      <button
        className="pagination__button btn-last"
        disabled={currentPage === lastPage}
        onClick={() =>handleClick( lastPage)}
      ></button>
    </div>
  );
};

export default Pagination;