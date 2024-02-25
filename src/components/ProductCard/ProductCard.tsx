type Props = {
  props: any
};
export const ProductCard = (props: Props) => {
  console.log(props)
  return (
    <div>
      {props.title ? props.title : props}
    </div>
  );
};