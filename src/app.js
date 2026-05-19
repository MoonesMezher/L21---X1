require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();

const morgan = require("morgan");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const DEFAULT_API_BASE = `http://localhost:${process.env.PORT || 3000}`;

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(morgan("dev"));

/** Portal + static UI — always use http://localhost:PORT, not file:// */
app.get("/", (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, "portal.html"));
});

app.get("/portal", (req, res) => {
    res.redirect("/portal.html");
});

app.get("/api/config", (req, res) => {
    res.status(200).json({
        apiBase: `${req.protocol}://${req.get("host")}`,
        portalUrl: `${req.protocol}://${req.get("host")}/`,
        defaultApiBase: DEFAULT_API_BASE,
    });
});

app.use(express.static(PUBLIC_DIR));

app.get("/api/health", (req, res) => res.status(200).json({ message: "API is healthy" }));

app.use("/api/v1/auth", require("./routes/auth.route"));
app.use("/api/v1/users", require("./routes/users.route"));
app.use("/api/v1/books", require("./routes/books.route"));
app.use("/api/v1/loans", require("./routes/loans.route"));

app.use(errorHandler);
app.use(notFound);

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    })
    .catch((err) => console.error("Could not connect to MongoDB", err));