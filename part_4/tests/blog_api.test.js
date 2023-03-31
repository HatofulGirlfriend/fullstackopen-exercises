const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

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

afterAll(async () => {
  await mongoose.connection.close()
})

