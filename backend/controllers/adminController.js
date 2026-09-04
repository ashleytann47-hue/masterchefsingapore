const supabase = require("../config/supabase");

async function getVoteRequests(req, res) {
  try {
    const { data, error } = await supabase
      .from("vote_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function approveVote(req, res) {
  try {
    const { id } = req.params;

    // Get the vote request
    const { data: request, error: requestError } = await supabase
      .from("vote_requests")
      .select("*")
      .eq("id", id)
      .single();

    if (requestError) throw requestError;

    // Update request status
    const { error: updateError } = await supabase
      .from("vote_requests")
      .update({
        status: "approved",
      })
      .eq("id", id);

    if (updateError) throw updateError;

    // Increase contestant votes
    const { data: contestant, error: contestantError } = await supabase
      .from("contestants")
      .select("votes")
      .eq("id", request.candidate_number)
      .single();

    if (!contestantError && contestant) {
      await supabase
        .from("contestants")
        .update({
          votes: (contestant.votes || 0) + 1,
        })
        .eq("id", request.candidate_number);
    }

    res.json({
      success: true,
      message: "Vote approved successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function rejectVote(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("vote_requests")
      .update({
        status: "rejected",
      })
      .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Vote rejected successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function deleteVote(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("vote_requests")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Vote deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  getVoteRequests,
  approveVote,
  rejectVote,
  deleteVote,
};