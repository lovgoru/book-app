const Comment = require("../models/comment");

const comments_get = async (req, res) => {
  try {
    const comments = await Comment.find({ id_book: req.params.id });
    return comments;
  } catch (err) {
    console.log(err);
  }
};

const comment_create = async (req, res) => {
  try {
    const comment = new Comment({
      id_author: req.user._id,
      id_book: req.params.id,
      text: req.body.commentInput,
    });
    await comment.save();
    res.redirect("/books/details/" + req.params.id);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  comments_get,
  comment_create,
};
