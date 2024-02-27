import md5 from "md5";
import { PASSWORD } from "../constants/api.ts";
import { IProduct } from "../types/IProduct.ts";

export const setHeadersAuth = () =>
  md5(`${PASSWORD}_${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`);

export const removeDuplicatesId = (array: string[]) => {
  const uniqueValues = new Set(array);
  return Array.from(uniqueValues);
};

export const removeDuplicatesProducts = (array: Array<IProduct>) => {
  const uniqueIds: string[] = [];
  const uniqueArray: IProduct[] = [];
  array.forEach((obj) => {
    if (!uniqueIds.includes(obj.id)) {
      uniqueIds.push(obj.id);
      uniqueArray.push(obj);
    }
  });
  return uniqueArray;
};

export const addDelimiter = (num: number = 0) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
