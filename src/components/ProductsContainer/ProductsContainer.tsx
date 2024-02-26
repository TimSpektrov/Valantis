import {useAppSelector} from "../../hooks/redux.ts";
import {ProductCard} from "../ProductCard/ProductCard.tsx";
import './productscontainer.scss'
import Pagination from "../Pagination/Pagination.tsx";

export const ProductsContainer = () => {
  const {pageProducts} = useAppSelector(state => state.productReducer)
  return (
    <>
      <div className="products">
        <ul className="products__list">
          {pageProducts && pageProducts.length > 0 && pageProducts.map((item) => (
            <li key={item.id} className="products__item">
              <ProductCard props={item} />
            </li>
          ))}
        </ul>
      </div>
      <Pagination />
    </>
  );
};