const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const listHelper = require("../utils/list_helper")

const api = supertest(app)

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs")
    .expect("Content-Type", /application\/json/)

  expect(response.body).toHaveLength(2)
}, 100000)

test("expect id to be defined", async () => {
  const response = await api.get("/api/blogs")
  console.log("response is", response.body)
  expect(response.body[0].id).toBeDefined()
  expect(response.body[1].id).toBeDefined()
})

afterAll(async () => {
  await mongoose.connection.close()
}, 100000)

test("Successfully create a new blog", async () => {
  const newBlog = {
    title: "Bosh!",
    author: "Henry & Ian",
    url: "https://www.bosh.tv/"
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