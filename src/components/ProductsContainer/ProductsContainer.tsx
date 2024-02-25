import {useEffect} from "react";
import {fetchProducts} from "../../store/reducers/ActionCreators.ts";

interface IProductsContainer {
  list: string[]
}
export const ProductsContainer = (list: IProductsContainer) => {
  useEffect(() => {
    dispatch(fetchProducts({action: 'get_ids'}))
  }, [])

  return (
    <>

    </>
  );
};