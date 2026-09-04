const express = require("express");
const router = express.Router();

const {
  submitVoteRequest,
  checkVoteStatus,
} = require("../controllers/voteRequestController");

router.post("/submit", submitVoteRequest);

router.get("/status/:id", checkVoteStatus);

module.exports = router;