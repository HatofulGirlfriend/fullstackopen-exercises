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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
