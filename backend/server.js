const express = require("express");
const cors = require("cors");
require("dotenv").config();

const supabase = require("./config/supabase");

const voteRequestRoutes = require("./routes/voteRequestRoutes");
const contestantRoutes = require("./routes/contestants");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.set("trust proxy", true);
app.use(cors());
app.use(express.json());

async function testSupabase() {
  try {
    const { error } = await supabase
      .from("contestants")
      .select("id")
      .limit(1);

    if (error) {
      console.log("❌ Supabase Error:", error.message);
    } else {
      console.log("✅ Supabase Connected");
    }
  } catch (err) {
    console.log("❌ Connection Error:", err.message);
  }
}

testSupabase();

app.use("/api/contestants", contestantRoutes);
app.use("/api/votes", voteRequestRoutes);
app.use("/api/admin", adminRoutes);

app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKING");
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MasterChef SG Backend Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});