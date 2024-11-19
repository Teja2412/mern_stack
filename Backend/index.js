const express = require("express");
const cors = require("cors"); // Import the CORS package
const mongoose = require("mongoose");
const ProductRoute = require("./routes/product");

const userRoute = require("./routes/user");

const app = express();

// Use CORS middleware
app.use(cors()); // Allow requests from any origin. Modify this for more security if needed.

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 5000; // Define the port number

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log to show the correct port
});

app.get("/", (req, res) => {
  res.send("App is running successfully");
});

app.use("/api/v1/products", ProductRoute); // Ensure this route is correct
app.use("/api/v1/user", userRoute);

mongoose
  .connect(
    "mongodb+srv://saitejarevur2412:Saiteja%402412@nodelearning.cbqba.mongodb.net/myNodeData?retryWrites=true&w=majority&appName=NodeLearning"
  )
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.log("Connection failed", error);
  });
