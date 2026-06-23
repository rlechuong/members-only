import express from "express";
import path from "node:path";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));

app.get("/", (req, res) => {
  res.send("Members Only is running.");
});

app.listen(PORT, () => {
  console.log(`Server Listening On Port ${PORT}`);
});
