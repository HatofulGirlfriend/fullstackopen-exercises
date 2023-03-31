const listHelper = require("../utils/list_helper")
var _ = require("lodash")


describe("total likes", () => {
  const listwithOneBlog = [
    {
      _id: "83383838338",
      title: "I am a test",
      author: "Testy McTesterson",
      url: "http://www.testsiteoftestystuff.edu/testblog",
      likes: 4,
      __v: 0
    }
  ]

  const bloglist = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 8,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }
  ]


  const emptyList = []

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listwithOneBlog)
    expect(result).toBe(4)
  })

  test("of a bigger list is calculated right", () => {

    const result = listHelper.totalLikes(bloglist)
    expect(result).toBe(44)
  })

  test("of an empty list that is zero", () => {

    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

})

describe("most popular authors", () => {
  const oneBlogEntry = {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 16,
    __v: 0
  }

  const bloglist = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 14,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 16,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }
  ]

  test("most likes from a bigger list", () => {
    const result = listHelper.favoriteBlog(bloglist)
    expect(result).toEqual(oneBlogEntry)
  })

  test("matching most likes of a blog to the title", () => {
    const result = listHelper.favoriteBlog(bloglist)
    expect(result.title).toEqual(oneBlogEntry.title)
  })

  const newBlogList = [
    {
      title: "Will this fit on my head?",
      author: "Seymour Hats",
      url: "blahblah",
      likes: 4
    },
    {
      title: "I can fly if you close your eyes",
      author: "Miteux LePew",
      url: "blahblah",
      likes: 83,
    },
    {
      title: "I can nap anywhere, learn how to do as I do!",
      author: "Beanie Hermenault",
      url: "blahblah",
      likess: 2
    },
    {
      title: "How I earned my living via baking",
      author: "Miteux LePew",
      url: "blahblah",
      likes: 383,
    },
    {
      title: "I like to eat baguettes",
      author: "Patrice Hermenault",
      url: "blahblah",
      likes: 0
    },
    {
      title: "This secret ingredient to my baguettes will get me thrown in jail",
      author: "Miteux LePew",
      url: "blahblah",
      likes: 38300,
    },
    {
      title: "The untimely demise of the shopping trolley",
      author: "Sean O'Hare",
      url: "blahblah",
      likes: 37
    },
    {
      title: "hfoefifefmmhefjeifhef?",
      author: "R. Varasavarajan",
      url: "blahblah",
      likes: 8
    },
    {
      title: "I am the best",
      author: "Miteux LePew",
      url: "blahblah",
      likes: 700,
    }

  ]

  const miteux = { "author": "Miteux LePew", "blogs": 4 }
  const miteuxLikes = { author: "Miteux LePew", likes: 39466 }

  test("results with author name and number of blogs", () => {
    const result = listHelper.mostBlogs(newBlogList)
    expect(result).toEqual(miteux)
  })

  test("checks for author with most likes across all blogs", () => {
    const result = listHelper.mostLikes(newBlogList)
    expect(result).toEqual(miteuxLikes)
  })
})