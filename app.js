require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require('path')
//importing routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");

//importing middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//multer-image-upload-config


const app = express();
const port = process.env.PORT || 5500;
const uri = "mongodb+srv://hritikg950:mongodb_hritik_1426@docthoughtcluster.ta0urzt.mongodb.net/?retryWrites=true&w=majority";
//connecting to DATABASE
mongoose
  .connect(process.env.DATABASE || uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//middlewares to run after connection established
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//ROUTES
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", postRoute);
app.use("/api", commentRoute);

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
