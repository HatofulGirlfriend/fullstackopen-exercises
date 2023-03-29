var _ = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = array => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return array.length === 0
    ? 0
    : array.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const findBlog = blogs.find(blog => blog.likes === maxLikes)
  return findBlog
}

const mostBlogs = (bloglist) => {
  const result = _(bloglist)
    .countBy("author")
    .entries()
    .maxBy(_.last)
  const formatted = {"author": result[0], "blogs": result[1]}
  return formatted
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
