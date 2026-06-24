import express from "express";
import path from "node:path";
import session from "express-session";
import pgSession from "connect-pg-simple";
import pool from "./db/pool.js";

const pgSessionStore = pgSession(session);

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));

app.use(express.static(path.join(import.meta.dirname, "public")));

app.use(
  session({
    store: new pgSessionStore({ pool }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  }),
);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server Listening On Port ${PORT}`);
});
