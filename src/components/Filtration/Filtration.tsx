import {useAppSelector} from "../../hooks/redux.ts";
import './filtration.scss'
import React, {useEffect, useState} from "react";

export const Filtration = () => {
  // const dispatch = useAppDispatch()
  const {filters} = useAppSelector(state => state.productReducer)
  const[inputPriceValue, setInputPriceValue] = useState(filters.minPrice)
  const [inputNameValue, setInputNameValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPriceValue(e.target.value)
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    if(e.target.value > filters.maxPrice) setInputPriceValue(filters.maxPrice)
    if(e.target.value < filters.minPrice) setInputPriceValue(filters.minPrice)
  }

  useEffect(() => {
    setInputPriceValue(filters.minPrice)
  }, []);
  return (
    <div className="filtration">
      {!filters.minPrice ?
        <p>filters loading...</p> :
        (<div className="filtration__container">
          <div className="brands">
            {filters.brands.map((brand: string) => (
              <button
                className="brands__btn"
                key={brand}
                id={brand}
              >{brand}</button>
            ))}
          </div>
          <div className="price">
            <div className="price__minmax">
              <div className="price__minmax-item">{filters.minPrice}</div>
              <div className="price__minmax-item">{filters.maxPrice}</div>
            </div>
            <input
              type="range"
              className="price__range"
              onChange={(e) => handleChange(e)}
              min={filters.minPrice}
              max={filters.maxPrice}
              value={inputPriceValue}
            />
            <input
              type="number"
              className="price__current-price"
              value={inputPriceValue}
              onChange={(e) => handleChange(e)}
              onBlur={handleBlur}
            />
          </div>
          <div className="name">
            <input
              type="text"
              className="name__input"
              placeholder="кольцо..."
              onChange={(e) => setInputNameValue(e.target.value)}
              value={inputNameValue}
            />
          </div>
        </div>)
      }
    </div>
  );
};