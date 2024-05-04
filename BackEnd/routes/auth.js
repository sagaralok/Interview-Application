const express = require("express");
const { body } = require("express-validator/check");
const Admin = require("../models/admin");
const authController = require("../controllers/auth");

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return Admin.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 6, max: 40 }),
    body("name").trim().isLength({ min: 3, max: 20 }),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
