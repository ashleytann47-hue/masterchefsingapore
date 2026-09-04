const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

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

// API Routes
app.use("/api/contestants", contestantRoutes);
app.use("/api/votes", voteRequestRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "MasterChef SG API Running",
  });
});

// Serve frontend static build files
const frontendDist = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendDist));

// SPA Catch-all: serve index.html for all non-API routes (Express 5 compatible)
app.use((req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});