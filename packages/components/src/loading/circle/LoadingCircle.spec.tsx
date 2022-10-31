import { render } from "@testing-library/react";

import { LoadingCircle } from "./LoadingCircle";

describe("LoadingCircle", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<LoadingCircle />);
    expect(baseElement).toBeTruthy();
  });
});
