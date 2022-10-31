import { render } from "@testing-library/react";

import { LoadingDots } from "./LoadingDots";

describe("LoadingDots", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<LoadingDots />);
    expect(baseElement).toBeTruthy();
  });
});
