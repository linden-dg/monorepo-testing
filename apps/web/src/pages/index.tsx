import { Button, Flex, Heading, LoadingCircle } from "@spicy-soup/components";
import { trpc } from "~/utils/trpc-client";
import type { TAppRouterInputs } from "~/utils/trpc-client";

const input: TAppRouterInputs["hello"]["world"] = { text: "New York" };
export default function Web() {
  const { data: healthCheck } = trpc.healthz.useQuery();
  const { data } = trpc.hello.world.useQuery(input);

  // const utils = trpc.useContext();
  return (
    <Flex
      className="min-h-screen w-screen"
      justify={"start"}
      align={"center"}
      direction="vertical"
    >
      <div className="">
        <div className="mx-auto max-w-screen-sm pt-72">
          <LoadingCircle />
        </div>
      </div>

      <Heading level={"1"}>Next JS App</Heading>
      <Heading level={"2"}>Woop woop</Heading>
      <Heading level={"3"}>Woop woop</Heading>

      <Heading level={"4"}>Woop woop</Heading>
      <Heading level={"5"}>Woop woop</Heading>
      <Heading level={"6"}>Woop woop</Heading>
      <b>Health: {healthCheck ?? "😔"}</b>
      <br />
      <b>Test: {data ?? "😔"}</b>
      <br />

      <Flex direction={"horizontal"} className="py-28 px-14 dark:bg-slate-800">
        <Button variant={"filled"}>Popsicle</Button>

        <Button theme="success" variant={"outline"} rounded uppercase>
          Popsicle
        </Button>
      </Flex>

      <br />
    </Flex>
  );
}
