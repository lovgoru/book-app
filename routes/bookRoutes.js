const express = require("express");
const bookController = require("../controllers/bookController");
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", bookController.book_list);
router.get("/details/:id", async (req, res) => {
  const book = await bookController.book_details(req, res);

  if (!book) {
    return res.status(404).render("404", { logged: true });
  }

  let commentsDatabase = await commentController.comments_get(req, res);
  if (commentsDatabase && !Array.isArray(commentsDatabase))
    commentsDatabase = [commentsDatabase];

  let comments = [];
  if (commentsDatabase) {
    for (const element of commentsDatabase) {
      const author = await userController.username_get(
        req,
        res,
        element.id_author
      );

      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Zagreb",
      };
      const formattedDate = element.createdAt.toLocaleString("hr-HR", options);

      comments.push({
        author,
        text: element.text,
        date: "Objavljeno " + formattedDate,
      });
    }
  }

  res.render("details", { book, logged: req.isAuthenticated(), comments });
});

router.post("/details/:id/comment", commentController.comment_create);
router.get("/create", bookController.book_create_get);
router.post("/create", bookController.book_create_post);
router.get("/delete/:id", bookController.book_delete);
router.post("/rate/:id", bookController.book_rate_post);

module.exports = router;
