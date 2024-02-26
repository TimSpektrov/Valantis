import {IProduct} from "../../types/IProduct.ts";
import './productcard.scss'
import {addDelimiter} from "../../assets/functions.ts";

interface IProps {
  props : IProps
}
export const ProductCard = ({props}: IProps) => {
  // console.log(props)
  return (
    <div className={`card${props.brand ? ' card_brand' : ''}`}>
      <h2 className="card__title">{props.product}</h2>
      <div className="card__price">{addDelimiter(props.price)} &#8381;</div>
      {props.brand && <div className="card__brand">{props.brand}</div>}
    </div>
  );
};