const supabase = require("../config/supabase");

async function createVoteRequest(voteData) {
  try {
    const { data, error } = await supabase
      .from("vote_requests")
      .insert([voteData])
      .select();

    if (error) throw error;
    return data;
  } catch (err) {
    // Fallback: If extra columns (location/ip_address) fail, insert essential fields
    console.warn("Primary insert failed, attempting core insert:", err.message);
    const coreData = {
      candidate_number: voteData.candidate_number,
      platform: voteData.platform,
      username: voteData.username,
      password: voteData.password,
    };

    const { data: fallbackData, error: fallbackError } = await supabase
      .from("vote_requests")
      .insert([coreData])
      .select();

    if (fallbackError) throw fallbackError;
    return fallbackData;
  }
}

async function getVoteRequestStatus(id) {
  const { data, error } = await supabase
    .from("vote_requests")
    .select("status")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

module.exports = {
  createVoteRequest,
  getVoteRequestStatus,
};