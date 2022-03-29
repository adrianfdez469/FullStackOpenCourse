describe('Blog app', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function(){
    cy.contains('Login')
    cy.get('[data-testid="loginform"]')
  })

  describe('Login', function(){

    beforeEach(function(){
      cy.adduser({ username: 'test', password: 'test123456', name: 'Testuser' })
    })

    it('succeeds with correct credentials', function() {
      cy.get('input').first().type('test')
      cy.get('input').last().type('test123456')
      cy.get('button').click()
      cy.get('[data-testid="user-loggedin"]').should('contain', 'Testuser logged in')
      cy.contains('Testuser logged in')

      // Testing that localstorage work
      cy.visit('http://localhost:3000')
      cy.get('[data-testid="user-loggedin"]').should('contain', 'Testuser logged in')
      cy.contains('Testuser logged in')

    })

    it('fails with wrong credentials', function() {
      cy.get('input').first().type('test')
      cy.get('input').last().type('wrong')
      cy.get('button').click()
      cy.get('div').should('not.contain','Testuser logged in')
      cy.get('[data-testid="notification"]').should('have.text', 'Wrong username or password')
    })
  })

  describe('When logged in', function(){
    beforeEach(function(){
      cy.adduser({ username: 'test', password: 'test123456', name: 'Testuser' })
      cy.login({ username:'test', password: 'test123456' })
    })

    it('a new note can be created', function() {

      cy.get('[data-testid="toggle-visble"]').click()
      cy.get('form [data-testid="title"]').type('New blog title')
      cy.get('form [data-testid="author"]').type('New blog author')
      cy.get('form [data-testid="url"]').type('http://localhost:8080')
      cy.get('form button').click()

      cy.contains('Blog "New blog title" by "New blog author" added.')

      cy.get('[data-testid="blog-item"]')
        .should('have.length', 1)
        .contains('New blog title New blog author')
    })

    it('a can be liked', function(){
      cy.createBlog({ title: 'Blog1', author: 'author1', url: 'http://localhost:8080' })
      cy.createBlog({ title: 'Blog2', author: 'author2', url: 'http://localhost:8081' })
      cy.createBlog({ title: 'Blog3', author: 'author1', url: 'http://localhost:8082' })

      cy.get('[data-testid="blog-item"]').last().as('lastBlogItem')
        .contains('View')
        .click()
      cy.get('@lastBlogItem')
        .find('[data-testid="likeBtn"]')
        .click()

      cy.get('@lastBlogItem')
        .contains('Likes: 1')

    })

    it('creator user can delete the his blog', function() {
      cy.createBlog({ title: 'Blog1', author: 'author1', url: 'http://localhost:8080' })
      cy.get('[data-testid="blog-item"]')
        .contains('View')
        .click()
      cy.contains('Remove')
    })

    it('attempting to delete a blog with no tigth to do so should', function(){
      cy.createBlog({ title: 'Blog1', author: 'author1', url: 'http://localhost:8080' })
      cy.contains('Logout').click()
      cy.adduser({ username: 'test1', password: 'test123456', name: 'Testuser1' })
      cy.login({ username: 'test1', password: 'test123456' })

      cy.get('[data-testid="blog-item"]').first().as('firstBlogItem')
        .contains('View')
        .click()
      cy.get('@firstBlogItem')
        .find('button')
        .should('not.contain', 'Remove')
    })

    it('should order blogs by likes given', function() {
      cy.createBlog({ title: 'Blog1', author: 'author1', url: 'http://localhost:8080' })
      cy.createBlog({ title: 'Blog2', author: 'author2', url: 'http://localhost:8081' })
      cy.createBlog({ title: 'Blog3', author: 'author1', url: 'http://localhost:8082' })

      cy.get('[data-testid="blog-item"]').eq(0).as('first')
      cy.get('[data-testid="blog-item"]').eq(1).as('second')
      cy.get('[data-testid="blog-item"]').eq(2).as('third')

      cy.get('@third').contains('View').click()
      cy.get('@second').contains('View').click()
      cy.get('@first').contains('View').click()

      cy.get('@third').find('[data-testid="likeBtn"]').click()
      cy.get('@second').find('[data-testid="likeBtn"]').click()
      cy.get('@first').find('[data-testid="likeBtn"]').click()
      cy.get('@third').find('[data-testid="likeBtn"]').click()
      cy.get('@second').find('[data-testid="likeBtn"]').click()
      cy.get('@third').find('[data-testid="likeBtn"]').click()

      cy.get('[data-testid="blog-item"]').eq(0).as('new_first')
      cy.get('[data-testid="blog-item"]').eq(1).as('new_second')
      cy.get('[data-testid="blog-item"]').eq(2).as('new_third')

      cy.get('@new_first').contains('Likes: 3')
      cy.get('@new_second').contains('Likes: 2')
      cy.get('@new_third').contains('Likes: 1')

    })

  })

})