var _ = require("lodash")

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
  const formatted = { "author": result[0], "blogs": result[1] }
  return formatted
}

const mostLikes = (bloglist) => {
  var output =
  _(bloglist)
    .groupBy("author")
    .map((objs, key) => ({
      "author": key,
      "likes": _.sumBy(objs, "likes") }))
    .value()

  const authorWithMostLikes = _.maxBy(output, "likes")
  return authorWithMostLikes
}

const initialBlogs = [
  {
    title: "The Plant-Based Wok",
    author: "Hannah Che",
    url: "https://theplantbasedwok.com/recipes",
  },
  {
    title: "The Minimalist Baker",
    author: "Dana Schultz",
    url: "https://minimalistbaker.com/",
  },
]

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  initialBlogs
}
