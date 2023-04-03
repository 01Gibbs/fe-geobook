import { auth } from '../firebaseConfig.js'
import axios from "axios";

const createToken = async () => {
  const user = auth.currentUser
  const token = user && (await user.getIdToken())
  const payloadHeader = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return payloadHeader
}

const geobookApi = axios.create({
  baseURL: 'https://geobook-api.onrender.com/api'
})

export const getUser = user_id => {
  return geobookApi.get(`/users/${user_id}`).then(({ data }) => {
    return data.user
  })
}

export const getBooks = () => {
  return geobookApi.get(`/books`).then(({ data }) => {
    return data.books
  })
}

export const getBook = book_id => {
  return geobookApi.get(`/books/${book_id}`).then(({ data }) => {
    return data.book
  })
}

export const postBook = (book) => {
  return geobookApi.post('/books', book).then(({data}) => {
    return data.book
  })
}


export const postUser = async (data) => {
  const header = await createToken()
  return geobookApi.post(`/users`, data, header)
  .then(({data})=>{
    console.log(data, '<posUser -> api.js')
    return data.user
  })
  .catch((e) => {
    console.log(e)
  })
};
