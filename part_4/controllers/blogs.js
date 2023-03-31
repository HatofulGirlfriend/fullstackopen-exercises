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

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
  })
  
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter