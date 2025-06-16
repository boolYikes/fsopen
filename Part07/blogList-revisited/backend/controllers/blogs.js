const blogsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.post("/", middleware.userExtractor, async (req, res) => {
  // auth
  const user = req.user;
  const body = req.body;
  const blog = new Blog({
    title: body.title,
    author: user.name,
    url: body.url,
    likes: body.likes,
    user: user._id, // this is an object and it's supposed to be an object
  });
  const savedBlog = await blog.save();
  await User.findByIdAndUpdate(
    user._id,
    { $push: { blogs: savedBlog.id } },
    { new: true },
  );
  savedBlog.populate("user", { username: 1, name: 1 });
  res.status(201).json(savedBlog);
});

// blogsRouter.delete('/', async (req, res) => {
//     // this is for resetting db in tests
//     if (process.env.NODE_ENV === 'test') {
//         await Blog.deleteMany({})
//         res.status(204).end()
//     }
// })

blogsRouter.delete("/:id", middleware.userExtractor, async (req, res) => {
  const user = req.user;
  const userObject = await User.findById(user._id.toString());
  const targetBlog = await Blog.findById(req.params.id);
  // console.log(userObject.blogs.map(blogIds => blogIds.toString()))
  // console.log(targetBlog.id)

  if (
    userObject.blogs
      .map((blogIds) => blogIds.toString())
      .includes(targetBlog.id)
  ) {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted); // 200 or 204
  } else {
    res.status(401).json({ error: "That's not your blog!" });
  }
});

// Not general-purpose. More like a like-handler. Is this a good practice?
blogsRouter.put("/:id", middleware.userExtractor, async (req, res, next) => {
  const user = req.user;
  const target = await Blog.findById(req.params.id);
  if (!target) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (process.env.NODE_ENV !== "test") {
    // allow dupes on tests
    if (target.liked_users.includes(user.id)) {
      return res.status(400).json({ message: "Can't submit duplicate likes!" });
    }
  }

  target.liked_users.push(user.id);
  target.likes = target.likes + 1;
  await target.save();
  res.status(200).json(target);

  // const updatedBlog = await Blog.findByIdAndUpdate(
  //     req.params.id,
  //     { user, title, author, likes, url },
  //     { new: true, runValidators: true, context: 'query'}
  // )
});

// For comments
blogsRouter.get("/:id/comment", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate({
    path: "comments",
    select: "content blog",
  });
  res.status(200).json(blog.comments);
});

blogsRouter.post("/:id/comment", async (req, res) => {
  const content = req.body.content;
  const blog = req.params.id;

  const comment = new Comment({ content: content, blog: blog });
  const savedComment = await comment.save();

  await Blog.findByIdAndUpdate(
    blog,
    { $push: { comments: savedComment._id } },
    { new: true },
  );

  const populatedComment = await savedComment.populate("blog", { id: 1 });
  res.status(201).json(populatedComment);
});

module.exports = blogsRouter;
