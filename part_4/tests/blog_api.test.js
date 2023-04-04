const supertest = require("supertest")
const mongoose = require("mongoose")
const listHelper = require("../utils/list_helper")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of listHelper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs")
    .expect("Content-Type", /application\/json/)

  expect(response.body).toHaveLength(2)
}, 100000)

test("expect id to be defined", async () => {
  const response = await api.get("/api/blogs")
  expect(response.body[0].id).toBeDefined()
  expect(response.body[1].id).toBeDefined()
})



test("Successfully create a new blog", async () => {
  const user = {
    username: "miteux",
    password: "iammiteux"
  }

  const loginUser = await api
    .post("/api/login")
    .send(user)
    .expect(200)

  const userToken = loginUser._body.token

  const newBlog = {
    title: "Bosh!",
    author: "Henry & Ian",
    url: "https://www.bosh.tv/",
    likes: 15,
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set({ "Authorization": "Bearer " + userToken })
    .expect(200)

  const response = await api.get("/api/blogs")

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(listHelper.initialBlogs.length + 1)
  expect(contents).toContain("Bosh!")
})

test("blog without likes defaults likes to zero", async () => {
  const user = {
    username: "miteux",
    password: "iammiteux"
  }

  const loginUser = await api
    .post("/api/login")
    .send(user)
    .expect(200)

  const userToken = loginUser._body.token

  const newBlog = {
    title: "test",
    author: "Henry & Ian",
    url: "https://www.bosh.tv/",
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set({ "Authorization": "Bearer " + userToken })
    .expect(200)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")

  expect(response.body[2].likes).toBe(0)
})

test("blog without title fails to post", async () => {
  const newBlog = {
    author: "Bad Blog",
    url:"testest",
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
})

test("blog without url fails to post", async () => {
  const newBlog = {
    title: "Bad blog title",
    author: "Bad Blog author",
  }
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
})

test("a blog can be deleted", async () => {
  const user = {
    username: "miteux",
    password: "iammiteux"
  }

  const loginUser = await api
    .post("/api/login")
    .send(user)
    .expect(200)

  const userToken = loginUser._body.token

  const newBlog = {
    title: "Bosh!",
    author: "Henry & Ian",
    url: "https://www.bosh.tv/",
    likes: 15,
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set({ "Authorization": "Bearer " + userToken })
    .expect(200)

  const blogsAtStart = await listHelper.blogsInDb()
  const blogToDelete = blogsAtStart[2]

  const hello = await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set({ "Authorization": "Bearer " + userToken })
    .expect(204)

  const blogsAtEnd = await listHelper.blogsInDb()
  console.log("hello is", hello)

  // expect(blogsAtEnd).toHaveLength(
  //   listHelper.initialBlogs.length - 1
  // )

  const contents = blogsAtEnd.map(r => r.title)

  expect(contents).not.toContain(blogToDelete.title)
}, )

test("updates the likes of a blog", async () => {
  const blogsAtStart = await listHelper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const blog = {
    title: "The Plant-Based Wok",
    author: "Hannah Che",
    url: "https://theplantbasedwok.com/recipes",
    likes: 28,
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blog)
    .expect(200)
})

test("user cannot be added with username less than 3 chars", async () => {
  const newUser = {
    username: "bo",
    name: "Big Bobbo",
    password: "cattodatto"
  }

  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
})

test("user cannot enter password that is less than 3 chars", async () => {
  const newUser = {
    username: "miteuxrockz",
    name: "Miteux LeFue",
    password: "nu"
  }

  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
})

test("new user can be created", async () => {
  const newUser = {
    username: "moox",
    name: "Miteux Leeeue",
    password: "iammieeeeux"
  }

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
})

test("user can sign-in and receive webtoken", async () => {
  const user = {
    username: "miteux",
    password: "iammiteux"
  }

  await api
    .post("/api/login")
    .send(user)
    .expect(200)

})

test("Adding a blog fails if token is not provided", async () => {

  const newBlog = {
    title: "Bosh!",
    author: "Henry & Ian",
    url: "https://www.bosh.tv/",
    likes: 15,
  }
  const banana = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401)

  console.log("banana is", banana)
})






afterAll(async () => {
  await mongoose.connection.close()
}, 100000)