import { auth } from "../firebaseConfig.js";
import axios from "axios";

const createToken = async () => {
  const user = auth.currentUser;
  const token = user && (await user.getIdToken());
  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
};

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

export const getBook = (book_id) => {
  return geobookApi.get(`/books/${book_id}`).then(({ data }) => {
    return data.book;
  });
};

export const postBook = (book) => {
  return geobookApi.post("/books", book).then(({ data }) => {
    return data.book;
  });
};

export const deleteBook = (book_id) => {
  return geobookApi.delete(`/books/${book_id}`);
};

export const postUser = async (data) => {
  const header = await createToken();
  return geobookApi
    .post(`/users`, data, header)
    .then(({ data }) => {
      return data.user;
    })
    .catch((e) => {
      console.log(e);
    });
};

export const patchUser = async (firebase_id, claimed_book) => {
  return geobookApi
    .patch(`/users/${firebase_id}`, { claimed_book })
    .then(({ data }) => {
      return data.user;
    });
};

export const getClaimedBookThumbnail = async (title) => {
  return axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`)
    .then((response) => {
      const bookData = response.data.items[0];
      return bookData.volumeInfo.imageLinks.smallThumbnail;
    })
    .catch(() => {
      return "http://books.google.com/books/content?id=ev52BgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";
    });
};
