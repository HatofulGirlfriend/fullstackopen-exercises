var _ = require("lodash")

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

const result = _(newBlogList)
.countBy("author")
.entries()
.maxBy(_.last)

console.log(result)