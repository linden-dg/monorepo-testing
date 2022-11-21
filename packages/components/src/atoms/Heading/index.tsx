import { Heading } from "./Heading";
import type { HeadingProps } from "./Heading";

export const H1 = (props: HeadingProps) => <Heading level="1" {...props} />;
export const H2 = (props: HeadingProps) => <Heading level="2" {...props} />;
export const H3 = (props: HeadingProps) => <Heading level="3" {...props} />;
export const H4 = (props: HeadingProps) => <Heading level="4" {...props} />;
export const H5 = (props: HeadingProps) => <Heading level="5" {...props} />;
export const H6 = (props: HeadingProps) => <Heading level="6" {...props} />;

export { Heading } from "./Heading";
export type { HeadingProps } from "./Heading";
