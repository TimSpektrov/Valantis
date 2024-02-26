import {useAppSelector} from "../../hooks/redux.ts";
import {ProductCard} from "../ProductCard/ProductCard.tsx";
import './productscontainer.scss'
import Pagination from "../Pagination/Pagination.tsx";
import {IProduct} from "../../types/IProduct.ts";

export const ProductsContainer = () => {
  const {pageProducts} = useAppSelector(state => state.productReducer)
  return (
    <>
      <div className="products">
        <ul className="products__list">
          {pageProducts && pageProducts.length > 0 && pageProducts.map((item: IProduct) => (
            <li key={item.id} className="products__item">
              <ProductCard brand={item.brand} product={item.product} price={item.price} id={item.id} />
            </li>
          ))}
        </ul>
      </div>
      <Pagination />
    </>
  );
};