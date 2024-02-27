import { IProduct } from "../../types/IProduct.ts";
import "./productcard.scss";
import { addDelimiter } from "../../assets/functions.ts";

export const ProductCard = ({ brand, product, price }: IProduct) => {
  return (
    <div className={`card${brand ? " card_brand" : ""}`}>
      {brand && <div className="card__brand">{brand}</div>}
      <h2 className="card__title">{product}</h2>
      <div className="card__price">{addDelimiter(price)} &#8381;</div>
    </div>
  );
};
