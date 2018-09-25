import axios from "axios";

export default {
  getArticles: function() {
    return axios.get("/api/articles");
  },
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
  updateArticle: function(articleData) {
    let id = articleData._id;
    let articleDataNew = {
         title: articleData.title,
         date: articleData.date,
         url: articleData.url
    };
    return axios.put("/api/articles/" + id , articleDataNew);
  }
};

/*
export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  // BEGIN MY CODE FOR UPDATING (added comma above also)
  // Updates a book in the database
  updateBook: function(bookData) {
    let id = bookData._id;
    let bookDataNew = {
         title: bookData.title,
         author: bookData.author,
         synopsis: bookData.synopsis
    };
    return axios.put("/api/books/" + id , bookDataNew);
  }
  // END MY CODE FOR UPDATING
};
*/