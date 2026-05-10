require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();

const morgan = require("morgan");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/health", (req, res) => res.status(200).json({ message: "API is healthy" }));

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