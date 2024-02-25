import md5 from "md5";
import {PASSWORD} from "../constants/api.ts";
import {IProduct} from "../types/IProduct.ts";

export const setHeadersAuth = () => md5(`${PASSWORD}_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`)

export const removeDuplicatesId = (array) => {
  const uniqueValues = new Set(array);
  return Array.from(uniqueValues);
}

export const removeDuplicatesProducts = (array) => {
  const uniqueIds = [];
  const uniqueArray = [];
  console.log('removeDuplicatesProducts')
  array.forEach(obj => {
    if (!uniqueIds.includes(obj.id)) {
      uniqueIds.push(obj.id);
      uniqueArray.push(obj);
    }
  });
  console.log(uniqueArray)
  return uniqueArray;
}

// export const removeDuplicatesItems = (array: string[] | IProduct[]) => {
//   console.log('removeDuplicatesItems', typeof array[0] === "string")
//   if(typeof array[0] === "string") {
//     return removeDuplicatesId(array);
//   } else {
//     return removeDuplicatesProducts(array);
//   }
// }