import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import "./filtration.scss";
import React, { useEffect, useState } from "react";
import { fetchProductsIds } from "../../store/reducers/ActionCreators.ts";

export const Filtration = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.productReducer);
  const [inputPriceValue, setInputPriceValue] = useState(filters.minPrice);
  const [inputNameValue, setInputNameValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPriceValue(e.target.value);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value > filters.maxPrice) setInputPriceValue(filters.maxPrice);
    if (e.target.value < filters.minPrice) setInputPriceValue(filters.minPrice);
  };

  const handleSubmit = (key: string, value: number | string) => {
    dispatch(fetchProductsIds({ action: "filter", params: { [key]: value } }));
  };
  useEffect(() => {
    setInputPriceValue(filters.minPrice);
  }, []);
  return (
    <div className="filtration">
      {!filters.minPrice ? (
        <p>filters loading...</p>
      ) : (
        <div className="filtration__container">
          <div className="filtration__filters">
            <div className="brands">
              {filters.brands.map((brand: string) => (
                <button
                  className="brands__btn"
                  key={brand}
                  onClick={() => handleSubmit("brand", brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
            <div className="price">
              {/*<div className="price__minmax">*/}
              {/*  <div className="price__minmax-item">{filters.minPrice}</div>*/}
              {/*  <div className="price__minmax-item">{filters.maxPrice}</div>*/}
              {/*</div>*/}
              {/*<input*/}
              {/*  type="range"*/}
              {/*  className="price__range"*/}
              {/*  onChange={(e) => handleChange(e)}*/}
              {/*  min={filters.minPrice}*/}
              {/*  max={filters.maxPrice}*/}
              {/*  value={inputPriceValue}*/}
              {/*/>*/}
              {/*input.price*/}
              <input
                type="number"
                className="price__current-price"
                value={inputPriceValue}
                onChange={(e) => handleChange(e)}
                onBlur={handleBlur}
              />
              <button
                className="filtration__submit"
                onClick={() => handleSubmit("price", inputPriceValue)}
              >
                Выбрать по цене
              </button>
            </div>
            <div className="name">
              <input
                type="text"
                className="name__input"
                placeholder="кольцо..."
                onChange={(e) => setInputNameValue(e.target.value)}
                value={inputNameValue}
              />
              <button
                className="filtration__submit"
                onClick={() => handleSubmit("product", inputNameValue)}
              >
                Выбрать по названию
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
