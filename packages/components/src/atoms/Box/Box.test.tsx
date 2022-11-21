import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Box } from "./Box";

describe("<Box />", () => {
  test("renders", () => {
    render(<Box />);
  });

  it("renders child", () => {
    render(<Box>woop woop!</Box>);
    expect(screen.getByText(/woop/i)).toBeInTheDocument();
  });

  it("renders with class", () => {
    const { container } = render(<Box className={"popsicle"} />);
    expect(container.firstChild).toHaveClass("popsicle");
  });

  it("renders polymorphic element", () => {
    render(<Box as={"h1"} />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("kitchen sink", () => {
    const { container } = render(
      <Box as={"h1"} className={["popsicle", "bam"]} style={{ color: "red" }}>
        woop woop!
      </Box>
    );
    expect(screen.getByText(/woop/i)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("popsicle");
    expect(container.firstChild).toHaveClass("bam");
    expect(container.firstChild).toHaveStyle("color: red;");
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
