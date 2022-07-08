const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("surname", "Surname is required").not().isEmpty(),
    check("email", "It's not a valid email").isEmail(),
    check("password", "Password requires at least 6 characters").isLength({
      min: 6,
    }),
  ],
  userController.register
);
router.post(
  "/authenticate",
  [
    check("email", "This is not a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  userController.authenticate
);
router.get("/login", auth, userController.login);
router.put("/update", auth, userController.update);
router.post("/upload-avatar", auth, userController.uploadAvatar);
router.get("/get-avatar/:filename", auth, userController.getAvatar);
router.get("/all-users", userController.getUsers);
router.get("/specific-user/:id", userController.getUser);

module.exports = router;
