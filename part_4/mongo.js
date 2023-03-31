const mongoose = require("mongoose")

if (process.argv.length<3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://tonipatsias:${password}@phonebookdb.ly3qels.mongodb.net/testBlogApp?retryWrites=true&w=majority`



mongoose.set("strictQuery",false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
})

const Blog = mongoose.model("Blog", blogSchema)

const note = new Blog({
  title: "The Minimalist Baker",
  author: "Dana Schultz",
  https: "//minimalistbaker.com/"
})


// Note.find({ important: true }).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })

note.save().then(() => {
  console.log("note saved!")
  mongoose.connection.close()
})