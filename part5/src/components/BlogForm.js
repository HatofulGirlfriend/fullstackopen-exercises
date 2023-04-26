import { useState } from "react"
import Togglable from "./Togglable"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setAuthor("")
    setTitle("")
    setUrl("")
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
    title:
        <input
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder="title input"
        /><br />
    author:
        <input
          value={author}
          onChange={event => setAuthor(event.target.value)}
          placeholder="author input"
        /><br />
    url:
        <input
          value={url}
          onChange={event => setUrl(event.target.value)}
          placeholder="url input"
        /><br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

Togglable.displayName = "Togglable"

export default BlogForm



