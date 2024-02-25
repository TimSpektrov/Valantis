import {useAppSelector} from "../../hooks/redux.ts";

export const ProductsContainer = () => {
  const {pageProducts} = useAppSelector(state => state.productReducer)
  console.log(pageProducts)
  return (
    <div className="products">
      <ul className="products__list">
      {/*  {pageProducts && pageProducts.length > 0 && pageProducts.map((item) => (*/}
      {/*    <li key={item.id} className=>{item.product}</li>*/}
      {/*  ))}*/}
      </ul>
    </div>
  );
};