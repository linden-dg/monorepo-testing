import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Box } from "../Box";
import { Stack } from "./Stack";

describe("<Stack />", () => {
  it("renders", () => {
    render(
      <Stack>
        <Box>woop woop!</Box>
      </Stack>
    );
    expect(screen.getByText(/woop/i)).toBeInTheDocument();
  });

  it("renders polymorphic element", () => {
    render(
      <Stack as={"span"} data-testid="test-span">
        <Box />
      </Stack>
    );
    expect(screen.getByTestId("test-span").nodeName.toLowerCase()).toBe("span");
  });

  it("renders with classes", () => {
    const { container } = render(
      <Stack
        direction="vertical"
        align="center"
        justify="center"
        wrap="wrap"
        className="test-class"
      >
        <Box />
      </Stack>
    );
    expect(container.firstChild).toHaveClass(
      "test-class",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "flex-wrap"
    );
  });
});
