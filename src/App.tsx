import {useAppDispatch, useAppSelector} from "./hooks/redux.ts";
import {useEffect} from "react";
import {fetchProductsIds} from "./store/reducers/ActionCreators.ts";
import './assets/global.scss'
import Preloader from "./components/Preloader/Preloader.tsx";
import Error from "./components/Error/Error.tsx";
import {ProductsContainer} from "./components/ProductsContainer/ProductsContainer.tsx";

function App() {
  const dispatch = useAppDispatch()
  const {isLoading, error} = useAppSelector(state => state.productReducer)

  useEffect(() => {
    dispatch(fetchProductsIds({action: 'get_ids'}))
  }, [])
  return (
    <div className='container'>
      {isLoading ?
        <Preloader /> :
        error ?
        <Error /> :
          <ProductsContainer />
      }
    </div>
  )
}

export default App
