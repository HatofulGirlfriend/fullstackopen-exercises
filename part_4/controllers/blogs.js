const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const { userExtractor } = require("../utils/middleware")

blogsRouter.get("/", async(request, response) => {
  const blogs = await Blog
    .find({}).populate("user", { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (body.title === undefined) {
    return response.status(400).json({ error: "title missing" })
  } else if (body.url === undefined) {
    return response.status(400).json({ error: "url missing" })
  } else if (!request.token) {
    return response.status(401).json({ error: "token not provided" })
  }


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  console.log("user is", user)
  console.log(request)
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(400).json({ error: "wrong user" })
  }
})

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body
  console.log("body here is", body)
  const blog = {
    user: body.user.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter