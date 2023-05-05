const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/register", userController.register_get);
router.post("/register", userController.register_post);
router.get("/login", userController.login_get);
router.post("/login", userController.login_post);
router.post("/logout", userController.logout);

module.exports = router;
