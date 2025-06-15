import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostingForm from "./PostingForm";
import loginService from "../services/login";
import axios from "axios";

describe("<PostingForm />", () => {
  let container;
  let addStub;
  let toggleStub;
  let content;

  beforeEach(() => {
    addStub = vi.fn();
    toggleStub = vi.fn();
    const prop = {
      addBlog: addStub,
      toggle: toggleStub,
    };
    content = {
      title: "test",
      author: "test",
      url: "test.com",
    };

    container = render(
      <PostingForm addBlog={prop.addBlog} toggle={prop.toggle} />,
    );
  });

  test("1. Correct submission details were used", async () => {
    vi.mock("axios");
    axios.post.mockResolvedValueOnce({
      data: { token: "123", username: content.author },
    });
    const mockUser = await loginService.login({
      username: content.author,
      password: content.author,
    });
    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(mockUser));

    const user = userEvent.setup();

    const titleInput = screen.getByPlaceholderText("title");
    const authorInput = screen.getByPlaceholderText("author");
    const urlInput = screen.getByPlaceholderText("url");

    await user.type(titleInput, content.title);
    await user.type(authorInput, content.author);
    await user.type(urlInput, content.url);

    // screen.debug()

    axios.post.mockResolvedValueOnce({
      data: content,
    });
    const submitButton = screen.getByText("create");
    await user.click(submitButton);

    // console.log("It was called with: ")
    // console.log(addStub.mock.calls)
    // console.log(axios.post.mock.calls[0])
    expect(addStub).toHaveBeenCalledWith(expect.objectContaining(content));
  });
});
