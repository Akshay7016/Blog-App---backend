const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json());

const blog = require("./routes/blog");
app.use("/api/v1", blog);

const connectDb = require("./config/database");
connectDb();

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("I am homepage")
})