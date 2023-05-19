const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
var bodyParser = require("body-parser");
const postsRouter = require("./router/posts.routes");
const usersRouter = require("./router/users.routes");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); // khi để true thì mình sử dụng đc những phươ
// parse application/json
app.use(bodyParser.json());

// Lấy về dữ liệu của toàn bộ của posts
app.use("/api/v1/posts", postsRouter);
// lấy về api của users
app.use("/api/v1/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
