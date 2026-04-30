import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

let storeRef=null;

export const injectStore = (_store) => {
  storeRef = _store;
};

API.interceptors.request.use((req) => {
  const token = storeRef?.getState()?.user?.currentUser?.token;
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;