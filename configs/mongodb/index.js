const { default: mongoose } = require("mongoose");

function connect() {
    
    mongoose.connect(process.env.DATABASE_URI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log(process.env.DATABASE_URI);
            console.log("Error connecting to MongoDB: ", err);
        })
    mongoose.connection
        .on('error', (error) => {
            console.log("MongoDB connection error: ", error);
        })
        .once('open', () => {
            console.log("Connected to MongoDB");
        })
        .on("disconnected", () => {
            console.log("Disconnected from MongoDB");
        })
}

module.exports = {
    connect,
}