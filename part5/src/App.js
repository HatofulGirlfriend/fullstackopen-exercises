import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import Notification from "./components/Notification"
import ErrorNotification from "./components/ErrorNotification"
import "./styles.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
    } 
    catch (exception) {
      setErrorMessage("Wrong username or password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
      id: blogs.length + 1,
    };

    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response));
    setTitle("")
    setAuthor("")
    setUrl("")
    setMessage(`A new blog ${response.title} by ${response.author} has been added`)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
    <div>
      username
      <input type="text"
      value={username}
      name="Username"
      onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
      type="password"
      value={password}
      name="Password"
      onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
  )

  const blogsList = () => (
    <>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </>
  )

  const blogForm = () => (
  <>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      title: <input
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      /><br />
      author: <input
        value={author}
        onChange={({ target }) => setAuthor(target.value)} 
        /><br />
      url: <input
        value={url}
        onChange={({ target }) => setUrl(target.value)} 
        /><br />
      <button type="submit">create</button>
    </form>
  </>
  )

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
        <p>{user.name} logged in <button onClick={logout}>log out</button></p>
          {blogForm()}
          {blogsList()}
        </div>}

    </div>
  )
}

export default App