const supertest = require("supertest")
const mongoose = require("mongoose")
const listHelper = require("../utils/list_helper")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")

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
  const newBlog = {
    title: "Bosh!",
    author: "Henry & Ian",
    url: "https://www.bosh.tv/",
    likes: 15,
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(listHelper.initialBlogs.length + 1)
  expect(contents).toContain("Bosh!")
})

test("blog without likes defaults likes to zero", async () => {
  const newBlog = {
    title: "test",
    author: "Henry & Ian",
    url: "https://www.bosh.tv/",
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
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
  const blogsAtStart = await listHelper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await listHelper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    listHelper.initialBlogs.length - 1
  )

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

afterAll(async () => {
  await mongoose.connection.close()
}, 100000)