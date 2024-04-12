const express = require("express");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const contactsRoutes = require("./routes/contacts");
const spamRoutes = require("./routes/spam");
const personalContactsRoutes = require("./routes/personalContacts");
const searchRoutes = require("./routes/search");

const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
PORT = 8000;

app.use(bodyParser.json());

// middlewares
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }

  next();
};

app.get("/healthcheck", async (req, res) => {
  try {
    res.status(200).send("I'm healthy");
  } catch (error) {
    res.status(500).send("Error  internal");
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/contacts", authenticateToken, contactsRoutes);
app.use("/api/do", authenticateToken, spamRoutes);
app.use("/api/personal-contacts", personalContactsRoutes);
app.use("/api/search", searchRoutes);

app.listen(PORT, () => {
  console.log("Server is listening ", PORT);
});
