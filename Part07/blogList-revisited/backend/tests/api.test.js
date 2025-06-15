const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const supertest = require("supertest");
const helper = require("./list_helper");
const assert = require("node:assert");
const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  await Blog.insertMany(helper.test_blogs); // for unit tests
});
test("Total length of posts check", async () => {
  const allBlogs = await api.get("/api/blogs");
  // console.log(allBlogs.body)
  assert.strictEqual(allBlogs.body.length, helper.test_blogs.length);
});
test('ID field as "id" check', async () => {
  const allBlogs = await api.get("/api/blogs");
  const check = allBlogs.body.map((blog) => {
    if ("id" in blog) {
      return true;
    }
  });
  assert.strictEqual(
    check.reduce((tot, curr) => {
      return tot + curr;
    }, 0),
    helper.test_blogs.length,
  );
});
test("Add a post check", async () => {
  const user = helper.testUsers[0]; // tester 1
  await api.post("/api/users").send(user);
  const theTokened = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });
  // console.log(`tokened one: ${theTokened.body.token}`)
  const blog = helper.testBlogsForAuth[0];
  const queryResult = await api
    .post("/api/blogs")
    .auth(theTokened.body.token, { type: "bearer" })
    .send({
      title: blog.title,
      url: blog.url,
      likes: blog.likes,
    })
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const currentPosts = await helper.getAllBlogs();
  assert.strictEqual(currentPosts.length, helper.test_blogs.length + 1);
  const lastPost = currentPosts[currentPosts.length - 1];
  const content = {
    title: lastPost.title,
    author: lastPost.author,
    url: lastPost.url,
    likes: lastPost.likes,
  };
  assert.deepStrictEqual(content, {
    title: queryResult.body.title,
    author: queryResult.body.author,
    url: queryResult.body.url,
    likes: queryResult.body.likes,
  });
});
test.only("Posting without a token check", async () => {
  const testBlog = helper.test_blogs[0];
  const initBlogs = await helper.getAllBlogs();
  await api.post("/api/blogs").send(testBlog).expect(401);
  const aftermath = await helper.getAllBlogs();
  assert.strictEqual(initBlogs.length, aftermath.length);
});
test('"likes" property default check', async () => {
  const user = helper.testUsers[0]; // tester 1
  await api.post("/api/users").send(user);
  const theTokened = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });
  const testPost = {
    title: "This is missing the 'likes' prop",
    author: "Sloppy doug",
    url: "http://dontlivelikeme.com",
  };
  await api
    .post("/api/blogs")
    .auth(theTokened.body.token, { type: "bearer" })
    .send(testPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const currentBlogs = await helper.getAllBlogs();
  // console.log(currentBlogs[currentBlogs.length - 1])
  assert.strictEqual(currentBlogs[currentBlogs.length - 1].likes, 0);
});
test("Bad request for no title and url", async () => {
  const user = helper.testUsers[0]; // tester 1
  await api.post("/api/users").send(user);
  const theTokened = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });
  const testPosts = [
    {
      likes: 2,
    },
    {
      title: "No url",
      likes: 1,
    },
    {
      url: "http://notitle.org",
    },
  ];
  const testPromises = testPosts.map(async (post) => {
    await api
      .post("/api/blogs")
      .auth(theTokened.body.token, { type: "bearer" })
      .send(post)
      .expect(400);
  });
  await Promise.all(testPromises);

  const currentBlogs = await helper.getAllBlogs();
  assert.strictEqual(currentBlogs.length, helper.test_blogs.length);
});
test("Delete test", async () => {
  const user = helper.testUsers[0]; // tester 1
  await api.post("/api/users").send(user);
  const theTokened = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });
  const blog = helper.testBlogsForAuth[0];
  const queryResult = await api
    .post("/api/blogs")
    .auth(theTokened.body.token, { type: "bearer" })
    .send({
      title: blog.title,
      url: blog.url,
      likes: blog.likes,
    });
  const initBlog = await helper.getAllBlogs();
  // console.log(queryResult.body.id)
  await api
    .delete(`/api/blogs/${queryResult.body.id}`)
    .auth(theTokened.body.token, { type: "bearer" })
    .expect(204);
  const aftermath = await helper.getAllBlogs();
  // console.log(aftermath)
  const titles = aftermath.map((b) => b.title);
  assert(!titles.includes(blog.title));
  assert.strictEqual(aftermath.length, initBlog.length - 1);
});
test("Get one id", async () => {
  const initBlogs = await helper.getAllBlogs();
  const target = initBlogs[0];
  const result = await api
    .get(`/api/blogs/${target.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  assert.deepStrictEqual(result.body, target);
});
// Put is for likes
// test('Update test', async () => {
//     const initBlogs = await helper.getAllBlogs()
//     const target = initBlogs[0]
//     const tempBlog = new Blog({
//         title: "Update test",
//         author: "Update test",
//         url: "https://test.update",
//         likes: 567
//     })
//     const putResult = await api
//         .put(`/api/blogs/${target.id}`)
//         .send(tempBlog)
//         .expect(200)
//         .expect('Content-Type', /application\/json/)
//     const getResult = await api
//         .get(`/api/blogs/${target.id}`)
//         .expect(200)
//         .expect('Content-Type', /application\/json/)
//     assert.deepStrictEqual(getResult.body, putResult.body)
// })
describe("User related tests", () => {
  test("Short password POST test", async () => {
    const invalid = {
      username: "invalid_one",
      name: "this_shall_not_pass",
      password: "",
    };
    const error = await api
      .post("/api/users")
      .send(invalid)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    assert.deepStrictEqual(error.body.error, "Password length too short");
  });
  test("Null password POST test", async () => {
    const invalid = {
      username: "invalid_one",
      name: "this_shall_not_pass",
    };
    const error = await api
      .post("/api/users")
      .send(invalid)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    assert.deepStrictEqual(error.body.error, "Invalid password");
  });
  test("Username validation: length", async () => {
    const invalid = {
      username: "no",
      name: "this_shall_not_pass",
      password: "12345678",
    };
    const error = await api
      .post("/api/users")
      .send(invalid)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    assert(error.body.error.includes("minimum allowed length"));
  });
  test("Username validation: unique", async () => {
    const userX = {
      username: "test1",
      name: "test1",
      password: "12345678",
    };
    await api.post("/api/users").send(userX).expect(201);
    const dupeUser = {
      username: "test1",
      name: "test2",
      password: "23456789",
    };
    const error = await api.post("/api/users").send(dupeUser).expect(400);
    assert(error.body.error.includes("unique"));
  });
});
after(async () => {
  await mongoose.connection.close();
});
