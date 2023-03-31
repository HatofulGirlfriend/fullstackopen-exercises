const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async(request, response) => {
  const blog = await Blog.find({})
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post("/", async (request, response) => {
  const body = request.body
  if (body.title === undefined) {
    return response.status(400).json({ error: "title missing" })
  } else if (body.url === undefined) {
    return response.status(400).json({ error: "url missing" })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)

})

module.exports = blogsRouter