import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

test("<BlogForm /> calls event handler Addblog on submit and passes correct details", async () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText("title input")
  const inputAuthor = screen.getByPlaceholderText("author input")
  const inputUrl = screen.getByPlaceholderText("url input")
  const sendButton = screen.getByText("create")

  await userEvent.type(inputTitle, "I am a blog")
  await userEvent.type(inputAuthor, "Mr Blog")
  await userEvent.type(inputUrl, "https://bloglandofblogs.com")
  await userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe("I am a blog")
  expect(createBlog.mock.calls[0][0].author).toBe("Mr Blog")
  expect(createBlog.mock.calls[0][0].url).toBe("https://bloglandofblogs.com")
})

