require("dotenv").config();
const express = require("express");
const connect = require("./Database/ConnectDb");
const cloudinary = require("cloudinary");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const userRouter = require("./Routes/UserRouter");
const applicationRouter = require("./Routes/applicationRouter");
const jobRouter = require("./Routes/jobRouter");
const ErrorMiddleware = require("./Middleware/error");
const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
app.use(ErrorMiddleware.errorMiddleware);


const PORT =  process.env.PORT ||4000;
connect().then(() => {
  app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
  });
});
