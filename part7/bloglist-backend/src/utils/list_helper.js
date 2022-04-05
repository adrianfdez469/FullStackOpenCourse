
const dummy = blogs => 1;

const totalLikes = blogs => blogs.reduce((sum, blog) => sum += blog.likes, 0);

const favoriteBlog = blogs => blogs
  .map(blog => ({
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }))
  .reduce((max, blog) => !max || max.likes < blog.likes ? blog : max, null);

const mostBlogs = blogs => {
  const aux = {}
  blogs.forEach(blog => {
    if(!aux[blog.author]){
      aux[blog.author] = {
        author: blog.author,
        blogs: 0
      }
    }
    aux[blog.author].blogs ++;
  })

  return Object.values(aux)
    .reduce((max, author) => !max || max.blogs < author.blogs ? author : max, null);
}

const mostLikes = blogs => {
  const aux = {}
  blogs.forEach(blog => {
    if(!aux[blog.author]){
      aux[blog.author] = {
        author: blog.author,
        likes: 0
      }
    }
    aux[blog.author].likes += blog.likes;
  })
  return Object.values(aux)
    .reduce((max, author) => !max || max.likes < author.likes ? author : max, null);
} 

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}