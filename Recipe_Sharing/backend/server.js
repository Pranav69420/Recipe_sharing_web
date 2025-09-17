const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

//env config
dotenv.config();

//DB connection
connectDB();

// rest object
const app = express();

//middlewares
app.use(express.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//Routes
// After
app.use("/user", require("./routes/userRoute"));
app.use("/recipe", require("./routes/recipeRoute"));

//PORTS
const PORT = process.env.PORT || 8000;

//checks
app.listen(PORT, (err) => {
  console.log(`App is running on port ${PORT}`);
});
