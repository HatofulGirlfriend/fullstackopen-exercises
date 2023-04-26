import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

const blog = {
  title: "I am a blog",
  author: "Mr Blog",
  url: "https://bloglandofblogs.com",
  likes: 9,
  user: {
    name: "Beanie Baby"
  }
}

describe("<Blog />", () => {
  test("at the start author and title are displayed but no other info", () => {
    let container = render(
      <Blog
        blog={blog}
      />
    ).container

    const div = container.querySelector(".blog-container")
    const urlSpan = container.querySelector(".urlspan")
    const likesSpan = container.querySelector(".likesspan")
    const partialDisplay = container.querySelector(".initial-display")
    expect(div).toHaveTextContent("I am a blog")
    expect(div).toHaveTextContent("Mr Blog")
    expect(partialDisplay).toBeVisible()
    expect(urlSpan).not.toBeVisible()
    expect(likesSpan).not.toBeVisible()
  })

  test("Checks that url and likes are show once view button is clicked", async () => {
    let container

    container = render(
      <Blog
        blog={blog}
      />
    ).container

    const urlSpan = container.querySelector(".urlspan")
    const likesSpan = container.querySelector(".likesspan")

    const user = userEvent.setup()
    const button = screen.getByText("view")
    await user.click(button)

    expect(urlSpan).toBeVisible()
    expect(likesSpan).toBeVisible()
  })

  test("Checks that if like button is clicked twice that it is called twice", async () => {
    const mockHandler = jest.fn()

    render(
      <Blog
        blog={blog} updateLikes={mockHandler}
      />
    )

    const user = userEvent.setup()
    const button = screen.getByText("view")
    const likeButton = screen.getByText("like")
    await user.click(button)
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})