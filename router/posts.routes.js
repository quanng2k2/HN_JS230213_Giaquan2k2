const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// get tất cả api posts
router.get("/", (req, res) => {
  const posts = JSON.parse(fs.readFileSync("./api/posts.json", "utf8"));
  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(404).json({ message: "No question found" });
  }
});

// get tất cả api post theo id
router.get("/:id", function (req, res) {
  let { id } = req.params;
  const posts = JSON.parse(fs.readFileSync("./api/posts.json"));
  const find = posts.find((posts) => posts.id == +id);
  if (find) {
    res.status(200).json(find);
  } else {
    res.status(404).json({ message: "No question found" });
  }
});

//api thêm 1 thông tin posts
router.post("/", (req, res) => {
  const { userId, id, title, body } = req.body;

  const posts = JSON.parse(fs.readFileSync("./api/posts.json", "utf8"));

  // Tạo đối tượng post mới
  const newPost = {
    userId,
    id: uuidv4(),
    title,
    body,
  };
  // Thêm post mới vào danh sách
  posts.push(newPost);
  // Ghi lại danh sách posts vào file
  fs.writeFileSync("./api/posts.json", JSON.stringify(posts, null, 2), "utf8");
  res.status(201).json({ message: "Post added successfully", post: newPost });
});

// Chỉnh sửa dữ liệu của một post
//update bài viết
router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { title, body } = req.body;
  let posts = JSON.parse(fs.readFileSync("./api/posts.json"));
  let postIndex = posts.findIndex((e) => +e.id === +id);
  if (!title || !body) {
    res.json({
      messege: "Thông tin không được để trống",
    });
  } else if (postIndex === -1) {
    res.status(404).json({
      messege: "Không tìm thấy bài viết",
    });
  } else {
    posts[postIndex].title = title;
    posts[postIndex].body = body;
  }
  try {
    fs.writeFileSync("./api/posts.json", JSON.stringify(posts));
    res.status(200).json({
      messege: "Update bài viết thành công",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

// Xóa bài viết
router.delete("/:id", (req, res) => {
  let { id } = req.params;
  let posts = JSON.parse(fs.readFileSync("./api/posts.json"));
  let newPost = posts.filter((e) => +e.id !== +id);
  try {
    fs.writeFileSync("./api/posts.json", JSON.stringify(newPost));
    res.status(200).json({
      messege: "Xóa bài viết thành công",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

module.exports = router;
