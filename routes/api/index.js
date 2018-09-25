const router = require("express").Router();
const bookRoutes = require("./books");
const articleRoutes = require("./articles");
const nytSearch = require("./nytSearch")

// routes
router.use("/books", bookRoutes);
router.use("/articles", articleRoutes);
router.use("/search", nytSearch);

module.exports = router;
