const express = require("express");
const dbConnect = require("./config/db");
const cors = require("cors");

const app = express(); // Create the server
dbConnect(); // Connect to the database
const port = process.env.PORT || 8000; // Define app port
app.use(express.json()); // Enable reading from body

// Enable CORS
const corsOption = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOption));

app.use(express.static("uploads")); // Enable public folder

// App routes
app.use("/api/user", require("./routes/users"));
app.use("/api/topic", require("./routes/topics"));
app.use("/api/comment", require("./routes/comments"));

app.listen(port, "0.0.0.0", () => {
  console.log(`The server is working on port: http://localhost:${port}`);
});
