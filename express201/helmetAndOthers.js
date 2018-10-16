const express = require("express");
const helmet = require("helmet");
const PORT = 8080;
const app = express();
app.use(helmet());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("trust proxy", true);

app.post("/ajax", (req, res) => {
  console.log(req);
  res.json({ type: "Test" });
});

app.listen(PORT, () => {
  console.log(`Up On Port ${PORT}`);
});
