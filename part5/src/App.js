import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import ErrorNotification from "./components/ErrorNotification"
import "./styles.css"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [blogsCopy, setBlogsCopy] = useState(blogs)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortByLikes = () => {
    // const blogsCopy = [...blogs]
    const compare = (a, b) => {
      if (a.likes < b.likes){
        return 1
      }
      if (a.likes > b.likes){
        return -1
      }
      return 0
    }

    blogs.sort(compare)
    // blogsCopy.sort(compare)
    // setBlogs(blogsCopy)
  }

  const deleteBlog = (idToDelete, blogToDelete) => {
    if (window.confirm(`Remove ${blogToDelete}?`)) {
      blogService
        .remove(idToDelete)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== idToDelete))
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      )
      setUser(user)
      setUsername("")
      setPassword("")
      blogService.setToken(user.token)
    }
    catch (exception) {
      setErrorMessage("Wrong username or password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    let response = await blogService.create(blogObject)
    blogFormRef.current.toggleVisibility()
    response = { ...response, user: { name: user.name } }
    setBlogs(blogs.concat(response))
    setMessage(`A new blog ${response.title} by ${response.author} has been added`)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const updateLikes = async (blog) => {
    const newLike = { ...blog, likes: blog.likes + 1 }

    await blogService.update(newLike.id, newLike)
    setBlogs(blogs.map(blog => blog.id === newLike.id ? newLike : blog))
  }

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
      username
        <input type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const blogsList = () => (
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes}
          handleDeleteBlog={deleteBlog} id={blog.id} blogname={blog.title} />
      )}
    </>
  )

  const blogForm = () => {

    return (
      <>

        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </>
    )
  }

  sortByLikes()

  return (
    <div>

      <Notification message={message} />
      <ErrorNotification errorMessage={errorMessage} />

      {!user && <div>
        <h1>Log in to application</h1>
        {loginForm()}
      </div>}
      {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button id="logout" onClick={logout}>log out</button></p>
        {blogForm()}
        {blogsList()}
      </div>}

    </div>
  )
}

export default App