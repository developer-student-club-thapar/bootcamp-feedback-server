if (process.env.NODE_ENV !== "production") {
  require("dotenv/config");
}

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const https = require("https");
const path = require("path");
const fs = require("fs");

// routers
const notesRouter = require("./routers/notesRouter");

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

app.use(
  cors({
    origin: "*",
  })
);

app.use(notesRouter);

mongoose.connect(process.env.db_connection, {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

app.get("*", (req, res) => {
  res.send("Page doesn't exist");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT || 3000, () => {
    console.log(`Serving on port ${PORT}`);
  });
} else {
  const sslServer = https.createServer(
    {
      key: fs.readFileSync(path.join(__dirname, "certs", "key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "certs", "cert.pem")),
    },
    app
  );
  sslServer.listen(PORT, () =>
    console.log(`Secure Server running on port ${PORT}`)
  );
}
