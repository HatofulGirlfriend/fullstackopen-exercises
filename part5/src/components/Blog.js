import { useState } from "react"

const Blog = ({ blog, updateLikes, id, blogname, handleDeleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const localStorageUserToMatch = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const updatedUser = JSON.stringify(user.name)
      return updatedUser
    }}

  const blogUserToMatch = JSON.stringify(blog.user.name)

  const showOnSameUser = () => {
    if (blogUserToMatch === localStorageUserToMatch()) {
      return { display: "" }
    } else {
      return { display: "none" }
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    <div style={blogStyle} className="blog-container">
      <div style={hideWhenVisible} className="initial-display">
        {blog.title} {blog.author} {" "}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="full-display">
        {blog.title} {blog.author} {" "} <button onClick={toggleVisibility}>hide</button><br />
        <span className="urlspan">{blog.url}</span><br />
        likes <span className="likesspan">{blog.likes}</span>{" "}<button onClick={() => updateLikes(blog)}>like</button><br />
        {blog.user.name}<br />
        <button style={showOnSameUser()} onClick={() => handleDeleteBlog(id, blogname)}>remove</button>
      </div>
    </div>
  )
}

export default Blog