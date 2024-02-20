
import axios from 'axios';
const baseURL  = 'http://127.0.0.1:8081';
const instance = axios.create({
  baseURL ,
  timeout: 8000, // 设置请求超时时间
});
export const tologin = (url, data) => {
  return instance.post(url, data);
};
export const getall = (url, data) => {
  return instance.get(url);
};
export const updateHead = (url, data) => {
  return instance.post(url,data);
};
export const getuser = (url, data) => {
  return instance.post(url,data);
};
export const queryImageById = (url, data) => {
  return instance.post(url,data);
};
export const getByid = (url, data) => {
  return instance.post(url,data);
};
export const usedgetByid = (url, data) => {
  return instance.post(url,data);
};
export const rentgetByid = (url, data) => {
  return instance.post(url,data);
};
