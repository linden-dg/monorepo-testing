import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Box } from "../Box";
import { Button } from "./Button";

describe("<Stack />", () => {
  it("renders", () => {
    render(
      <Button>
        <Box>woop woop!</Box>
      </Button>
    );
    expect(screen.getByText(/woop/i)).toBeInTheDocument();
  });
});
