const express = require("express");
const router = express.Router();

const {
  getVoteRequests,
  approveVote,
  rejectVote,
  deleteVote,
} = require("../controllers/adminController");

router.get("/requests", getVoteRequests);

router.put("/approve/:id", approveVote);

router.put("/reject/:id", rejectVote);

router.delete("/delete/:id", deleteVote);

module.exports = router;