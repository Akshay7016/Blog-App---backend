const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log("Database connection successful"))
        .catch((error) => {
            console.log("Error in database connection: " + error);
            process.exit(1);
        })
}

module.exports = connectDb;