

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const infoRoute = require("./routes/information");
dotenv.config();
app.use(express.json());

var cors = require('cors')
app.use(cors()) 
mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/information", infoRoute)

app.listen("5000", () => {
    console.log("Backend is running.");
  });
const PORT = process.env.PORT 
  app.listen(PORT , ()=> {

    console.log("backend is running" + PORT);
}
);

//app crash handler for wrong input
  process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
  });