const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const postsRouter = require("./routes/post");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/posts", postsRouter);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Deployment successful! Welcome to your Express app.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
