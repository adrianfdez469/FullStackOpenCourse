const listHelper = require('../src/utils/list_helper')

const blogs = [
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
    likes: 0,
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

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const resp = listHelper.totalLikes([]);
    expect(resp).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const resp = listHelper.totalLikes([{
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }]);
    expect(resp).toBe(5)
  })
  test('of a bigger list is calculated right', () => {
    const resp = listHelper.totalLikes(blogs);
    expect(resp).toBe(36)
  })

})

describe('favorite blog', () => {
  
  test('should return null for empty blog list', () => {
    const resp = listHelper.favoriteBlog([])
    expect(resp).toBe(null)
  })

  test('should return the blog if theres only one', () => {
    const resp = listHelper.favoriteBlog([blogs[0]]);
    
    expect(resp).toEqual({
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes
    });
  })

  test('should return the blog with mots likes', () => {
    const resp = listHelper.favoriteBlog(blogs);
    expect(resp).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})


describe('most blogs author', () => {
  test('Should return null if no blogs given', () => {
    const resp = listHelper.mostBlogs([])
    expect(resp).toBe(null)
  })

  test('Should return the blogger if there\'s only one', () => {
    const resp = listHelper.mostBlogs([blogs[1]])
    expect(resp).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1
    })
  })

  test('should return the blogger with most blogs', () => {
    const resp = listHelper.mostBlogs(blogs)
    expect(resp).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

describe('most likes author', () => {
  test('should return null if theres no blog on the list', () => {
    const resp = listHelper.mostLikes([])
    expect(resp).toBe(null);
  })

  test('should return the authors likes if theres only one blog', () => {
    const resp = listHelper.mostLikes([blogs[3]])
    expect(resp).toEqual({
      author: "Robert C. Martin",
      likes: 10
    })
  })

  test('should return the author with more likes', () => {
    const resp = listHelper.mostLikes(blogs);
    expect(resp).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})