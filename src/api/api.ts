
import axios from 'axios';
const baseURL  = 'http://127.0.0.1:8081';
const instance = axios.create({
  baseURL ,
  timeout: 8000, // 设置请求超时时间
});
export const tologin = (url, data) => {
  return instance.post(url, data);
};
export const singin = (url, data) => {
  return instance.post(url, data);
};
export const getbyusername = (url, data) => {
  return instance.post(url, data);
};
export const editphone = (url, data) => {
  return instance.post(url, data);
};
export const editpw = (url, data) => {
  return instance.post(url, data);
};
export const getall = (url) => {
  return instance.get(url);
};
export const newhomegetHot = (url) => {
  return instance.get(url);
};
export const usedgetHot = (url) => {
  return instance.get(url);
};
export const rentgetHot = (url) => {
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
export const getHousetype = (url, data) => {
  return instance.post(url,data);
};
export const getrentimg = (url, data) => {
  return instance.post(url,data);
};
export const gethouseqa = (url, data) => {
  return instance.post(url,data);
};
export const getallhouseqa = (url, data) => {
  return instance.post(url,data);
};
export const gethouseqabyid = (url, data) => {
  return instance.post(url,data);
};
export const addquestion = (url, data) => {
  return instance.post(url,data);
};
export const addanswer = (url, data) => {
  return instance.post(url,data);
};
export const searchQa = (url, data) => {
  return instance.post(url,data);
};
export const getusedhouseqa = (url, data) => {
  return instance.post(url,data);
};
export const alikebynra = (url, data) => {
  return instance.post(url,data);
};
export const condition = (url, data) => {
  return instance.post(url,data);
};
export const getbyprice = (url, data) => {
  return instance.post(url,data);
};
export const getquestionbyuser = (url, data) => {
  return instance.post(url,data);
};
export const getanswerbyuser = (url, data) => {
  return instance.post(url,data);
};
export const getcollect = (url, data) => {
  return instance.post(url,data);
};
export const collected = (url, data) => {
  return instance.post(url,data);
};
export const decollect = (url, data) => {
  return instance.post(url,data);
};
export const getcollectnum = (url, data) => {
  return instance.post(url,data);
};