import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Box } from "../Box";
import { Grid } from "./Grid";

describe("<Grid />", () => {
  it("renders", () => {
    render(
      <Grid>
        <Box>woop woop!</Box>
      </Grid>
    );
    expect(screen.getByText(/woop/i)).toBeInTheDocument();
  });

  it("renders polymorphic element", () => {
    render(
      <Grid as={"span"} data-testid="test-span">
        <Box />
      </Grid>
    );
    expect(screen.getByTestId("test-span").nodeName.toLowerCase()).toBe("span");
  });

  it("renders with classes", () => {
    const { container } = render(
      <Grid
        content="center"
        align="center"
        justify="center"
        className="test-class"
      >
        <Box />
      </Grid>
    );
    expect(container.firstChild).toHaveClass(
      "test-class",
      "grid",
      "place-content-center",
      "justify-items-center",
      "content-center"
    );
  });
});
