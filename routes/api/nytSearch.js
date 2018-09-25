const router = require("express").Router();
const nytController = require("../../controllers/nytController");

// Matches with "/api/search"
router.route("/:q")
  .get(nytController.searchApi);

module.exports = router;
