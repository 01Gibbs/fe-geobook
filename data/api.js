import axios from "axios";

const geobookApi = axios.create({
  baseURL: "https://geobook-api.onrender.com/api",
});

export const getUser = (user_id) => {
  return geobookApi.get(`/users/${user_id}`).then(({ data }) => {
    return data.user;
  });
};

export const getBooks = () => {
  return geobookApi.get(`/books`).then(({ data }) => {
    return data.books;
  });
};

export const postUser = (data) => {
  return geobookApi.post(`/users`, data)
  .then(({data})=>{
    console.log(data, '<posUser -> api.js')
    return data.user
  })
};
