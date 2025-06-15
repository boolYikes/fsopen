import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
  let likeStub;
  let deleteStub;

  beforeEach(() => {
    // do something
    likeStub = vi.fn();
    deleteStub = vi.fn();
    const prop = {
      sessionInfo: {
        username: "tester",
      },
      blog: {
        title: "test",
        author: "tester",
        url: "www.com",
        likes: 0,
      },
      onUpdate: likeStub,
      onDelete: deleteStub,
    };

    // Render
    container = render(
      <Blog
        blog={prop.blog}
        sessionInfo={prop.sessionInfo}
        onDelete={prop.onDelete}
        onUpdate={prop.onUpdate}
      />,
    );
  });

  test("1. Renders blog's title & author but nod url, likes by default", () => {
    // screen.debug()
    const defaultInfo = screen.getByText("test by tester", { exact: false });
    const urlInfo = screen.queryByText("URL:"); // won't raise if and when result is null
    const likesInfo = screen.queryByText("Likes:");

    expect(defaultInfo).toBeDefined();
    expect(urlInfo).toBeNull();
    expect(likesInfo).toBeNull();
  });

  test("2. Url & likes are shown when the show button is clicked", async () => {
    const user = userEvent.setup();
    const showButton = screen.getByTestId("normalButton"); // show button uses setState for onClick internally. mockHandler will not work.
    await user.click(showButton); // adds count to the mock.calls

    // screen.debug()
    const urlInfo = screen.getByText((text) => text.includes("URL:"));
    const likesInfo = screen.getByText((text) => text.includes("Likes:"));

    expect(urlInfo).toBeDefined();
    expect(likesInfo).toBeDefined();
  });
});
