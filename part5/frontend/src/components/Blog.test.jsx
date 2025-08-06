import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
	let container

	beforeEach(() => {
		const blog = {
			title: "Component testing is done with react-testing-library",
			author: "JK Rowling",
			url: "google.com",
			likes: 6,
			user: {
				username: "mlg",
				name: "Test",
			}
		}

		// render() returns an object w multiple properties:
		// {
		//   container: <div>...</div>,
		//   getByText: function,
		//   getByRole: function,
		//   queryByText: function,
		//   // ... many other testing utilities
		// }
		// Need destructure, or use .container to get the container properties
		container = render(<Blog blog={blog} />).container
	})

	test('renders title and author', () => {
		const div = container.querySelector('.blog')
		expect(div).toHaveTextContent('Component testing is done with react-testing-library')
		expect(div).toHaveTextContent('JK Rowling')
	})

	test('at start toggable content (URL & no. of likes) not displayed', () => {
		const div = container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: none')
	})

	test('after clicking the button, toggable content are displayed', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('view')
		await user.click(button)

		const div = container.querySelector('.togglableContent')
		expect(div).not.toHaveStyle('display: none')
	})
})