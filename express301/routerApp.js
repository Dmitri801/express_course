const express = require("express");
const helmet = require("helmet");
const router = require("./theRouter");
const userRouter = require("./userRouter");
const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/", router);
app.use("/user", userRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Up On Port: ${PORT}`);
});
