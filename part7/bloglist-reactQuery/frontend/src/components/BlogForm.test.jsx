import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const addBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm addBlog={addBlog} />);

  const titleInput = screen.getByPlaceholderText("title");
  const authorInput = screen.getByPlaceholderText("author");
  const urlInput = screen.getByPlaceholderText("url");

  const submitButton = screen.getByText("add");

  await user.type(titleInput, "Hello World");
  await user.type(authorInput, "Teo En ming");
  await user.type(urlInput, "google.com");
  await user.click(submitButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe("Hello World");
  expect(addBlog.mock.calls[0][0].author).toBe("Teo En ming");
  expect(addBlog.mock.calls[0][0].url).toBe("google.com");
});
