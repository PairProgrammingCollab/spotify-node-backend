const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

require("dotenv").config();

const app = express();
app.use(cors());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/tracks", async function (req, res) {
  try {
    const { data: tracks, error } = await supabase.from("tracks").select(`
      id,
      title,
      duration_ms,
      explicit,
      file_path,
      album:albums (
        id,
        title,
        image_url
      )
    `);

    if (error) throw error;
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Root test route
app.get("/", function (req, res) {
  res.send("Supabase Music API is running 🎵");
});

// Start server
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server running on http://localhost:" + PORT);
});