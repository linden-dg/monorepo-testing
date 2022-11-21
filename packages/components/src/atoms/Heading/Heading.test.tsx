import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Heading } from "./Heading";

describe("<Heading />", () => {
  test("renders", () => {
    render(<Heading />);
  });

  it("renders child", () => {
    render(<Heading>woop woop!</Heading>);
    expect(screen.getByText(/woop/i)).toBeInTheDocument();
  });

  it("renders with class", () => {
    const { container } = render(<Heading className={"popsicle"} />);
    expect(container.firstChild).toHaveClass("popsicle");
  });

  it("renders polymorphic element", () => {
    render(<Heading level="3" />);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  it("kitchen sink", () => {
    const { container } = render(
      <Heading
        as={"h1"}
        className={["popsicle", "bam"]}
        style={{ color: "red" }}
        level="3"
      >
        woop woop!
      </Heading>
    );
    expect(screen.getByText(/woop/i)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("popsicle", "bam", "text-3xl");
    expect(container.firstChild).toHaveStyle("color: red;");
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
