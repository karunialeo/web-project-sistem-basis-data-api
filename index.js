import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

import router from "./routes/api.js";
app.use("/api", router);

// Catch-all route for non-existent routes
app.all("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
