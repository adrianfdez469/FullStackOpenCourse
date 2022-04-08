import '@testing-library/jest-dom/extend-expect'
import { render } from '../../tests/test-util'
import BlogListItem from './BlogList/BlogListItem'

describe('Rendering BlogItem', () => {

  const blogData = {
    title: 'Blog title',
    author: 'Author name',
    url: 'http://localhost',
    likes: 5,
    id: '65981651684984',
    user: {
      name: 'User name'
    }
  }

  test('should render blog title and author',async () => {
    const { container } = render(<BlogListItem blog={blogData}/>)

    const item = container.querySelector('li')
    expect(item).toHaveTextContent(blogData.title)
    expect(item).toHaveTextContent(blogData.author)

    const link = item.querySelector('a')
    expect(link).toBeDefined()
    expect(link).toHaveTextContent(blogData.title)
    expect(link).toHaveAttribute('href', `/blogs/${blogData.id}`)

  })
})