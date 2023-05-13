describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    let user = {
      name: "Beanie Baby",
      username: "bbaby",
      password: "meowmeow"
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    user = {
      name: "Miteux LePew",
      username: "miteux",
      password: "bread"
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function() {
    cy.contains("Log in to application")
    cy.contains("logged in").should("not.exist")
  })

  describe("log in", function() {
    it("succeeds with correct credentials", function() {
      cy.contains("login").click()
      cy.get("#username").type("bbaby")
      cy.get("#password").type("meowmeow")
      cy.get("#login-button").click()

      cy.contains("Beanie Baby logged in")
    })

    it("fails with wrongs credentials", function() {
      cy.contains("login").click()
      cy.get("#username").type("bbaby")
      cy.get("#password").type("wrong")
      cy.get("#login-button").click()

      cy.get(".error").should("contain", "Wrong username or password")
    })
  })

  describe("while logged in", function() {
    beforeEach(function() {
      cy.get("#username").type("bbaby")
      cy.get("#password").type("meowmeow")
      cy.get("#login-button").click()

      cy.contains("new blog").click()
      cy.get("#title").type("Baking for life")
      cy.get("#author").type("Baker Miteux")
      cy.get("#url").type("http://miteuxlland.com")
      cy.get("#create").click()
      cy.wait(5000)
    })

    it("a blog can be created", function() {
      cy.contains("new blog").click()
      cy.get("#title").type("A blog by Miteux")
      cy.get("#author").type("Miteux LePew")
      cy.get("#url").type("http://miteuxlland.com")
      cy.get("#create").click()

      cy.contains("A blog by Miteux")
    })

    it("a user can like a blog", function() {
      cy.contains("view").click()
      cy.contains("like").click()

      cy.contains(1)
    })

    it("User who created blog can delete it", function() {
      cy.contains("view").click()
      cy.contains("remove").click()
    })

    it("Only user who created blog can see delete button of that blog", function() {
      cy.get("#logout").click().wait(2000)
      cy.wait(3000)
      cy.get("#username").type("miteux")
      cy.get("#password").type("bread")
      cy.get("#login-button").click()

      cy.contains("view").click()
      cy.get("html").should("not.contain", "delete")
    })

    it.only("Blogs are ordered according to most likes", function() {
      cy.contains("new blog").click()
      cy.get("#title").type("Baker Baker")
      cy.get("#author").type("Patrice")
      cy.get("#url").type("http://miteuxlland.com")
      cy.get("#create").click()
      cy.wait(3000)

      cy.get(".blog-container").eq(0).contains("view").click()
      cy.get(".blog-container").eq(0).contains("like").click()

      cy.get(".blog-container").eq(1).contains("view").click()
      cy.get(".blog-container").eq(1).contains("like").click()
      cy.get(".blog-container").eq(1).contains("like").click()

      cy.get(".blog-container").eq(0).should("contain", "Baker Baker")
      cy.get(".blog-container").eq(1).should("contain", "Baking for life")
    })
  })
})