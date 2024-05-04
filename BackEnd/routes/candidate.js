const express = require("express");
const { body } = require("express-validator/check");

const candidateController = require("../controllers/candidate");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/candidates", isAuth, candidateController.getCandidates);
router.post(
  "/candidate",
  isAuth,
  [
    body("name").trim().isLength({ min: 1 }),
    body("status").trim().isLength({ min: 1 }),
  ],
  candidateController.createCandidate
);

router.put(
  "/candidate/:candidateId",
  isAuth,
  candidateController.updateCandidate
);

router.post(
  "/candidateRemove/:candidateId",
  isAuth,
  candidateController.deleteCandidate
);

module.exports = router;
