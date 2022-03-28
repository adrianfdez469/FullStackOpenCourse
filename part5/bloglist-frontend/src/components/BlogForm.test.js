import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('Testing blog form component', () => {

  const userData = {
    token: '@#$$^@$^#^$#$EFDFSDFSDFSDF'
  }


  test('should check that the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const mockHandler = jest.fn()
    const { container } = render(<BlogForm addBlog={mockHandler} user={userData} />)
    const button = container.querySelector('[type="submit"]')

    const titleInput = container.querySelector('[name="title"]')
    const authorInput = container.querySelector('[name="author"]')
    const urlInput = container.querySelector('[name="url"]')

    userEvent.type(titleInput, 'New blog')
    userEvent.type(authorInput, 'New blog author')
    userEvent.type(urlInput, 'New blog url')

    screen.debug(container)
    await userEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].content).toMatch

  })
})