const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.get("/", bookController.book_list);
router.get("/details/:id", bookController.book_details);
router.get("/create", bookController.book_create_get);
router.post("/create", bookController.book_create_post);
router.get("/delete/:id", bookController.book_delete);
router.post("/rate/:id", bookController.book_rate_post);

module.exports = router;
