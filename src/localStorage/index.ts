import { isJsonString } from '../utils';

export const getStorage = (key: string) => {
  const storage = window.localStorage.getItem(key);
  return isJsonString(storage) ? JSON.parse(storage) : storage;
};

export const setStorage = (key: string, value: any) => {
  const res = typeof value === 'string' ? value : JSON.stringify(value);
  window.localStorage.setItem(key, res);
};

export const removeStorage = (key: string) => {
  window.localStorage.removeItem(key);
};
