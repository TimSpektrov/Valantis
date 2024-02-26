import md5 from "md5";
import {PASSWORD} from "../constants/api.ts";

export const setHeadersAuth = () => md5(`${PASSWORD}_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`)

export const removeDuplicatesId = (array) => {
  const uniqueValues = new Set(array);
  return Array.from(uniqueValues);
}

export const removeDuplicatesProducts = (array) => {
  const uniqueIds = [];
  const uniqueArray = [];
  array.forEach(obj => {
    if (!uniqueIds.includes(obj.id)) {
      uniqueIds.push(obj.id);
      uniqueArray.push(obj);
    }
  });
  return uniqueArray;
}

export const addDelimiter = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}