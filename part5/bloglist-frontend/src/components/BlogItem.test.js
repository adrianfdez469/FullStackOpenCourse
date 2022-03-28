//import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogItem from './BlogItem'

describe('Rendering BlogItem', () => {

  const blogData = {
    title: 'Blog title',
    author: 'Author name',
    url: 'http://localhost',
    likes: 5,
    user: {
      name: 'User name'
    }
  }
  const userData = {
    name: 'User name',
  }

  test('should render blog title and author, but not url or likes', () => {
    const { container } = render(<BlogItem user={userData} blog={blogData} />)

    const primaryDiv = container.querySelector('#blog-basic-data')
    const secondaryDiv = container.querySelector('#blog-full-data')
    // const secondaryDiv = container.querySelector('[display="None"]')
    // expect(secondaryDiv).toBeDefined()
    expect(primaryDiv).toHaveTextContent('Blog title')
    expect(primaryDiv).toHaveTextContent('Author name')

    expect(secondaryDiv).toHaveStyle('display: None')

  })

  test('should show url and likes when show is clicked', () => {
    //const mockHandler = jest.fn()
    const { container } = render(<BlogItem user={userData} blog={blogData} />)
    const button = screen.getByText('View')
    userEvent.click(button)

    const secondaryDiv = container.querySelector('#blog-full-data')
    const urlDiv = screen.getByText('http://localhost')
    const likesDiv = screen.getByText('Likes: 5')

    expect(secondaryDiv).not.toHaveStyle('display: None')
    expect(urlDiv).toBeDefined()
    expect(likesDiv).toBeDefined()
  })

  test('should call event handler for like button twice if the button is clicked twice', () => {
    const mockHandler = jest.fn()
    const { container } = render(<BlogItem user={userData} blog={blogData} onLikeBlog={mockHandler} />)
    const button = screen.getByText('View')
    userEvent.click(button)


    const likeButton = container.querySelector('#likeBtn')
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})