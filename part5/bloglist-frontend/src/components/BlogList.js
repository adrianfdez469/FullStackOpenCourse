import React from 'react';
import BlogItem from './BlogItem'

const BlogList = props => {
  const {blogs, user, onLikeBlog, onDeleteBlog} = props
  return blogs.sort((a,b) => b.likes - a.likes).map(blog =>
    <BlogItem key={blog.id} blog={blog} user={user} onLikeBlog={onLikeBlog} onDeleteBlog={onDeleteBlog}/>
  );
}
export default BlogList;