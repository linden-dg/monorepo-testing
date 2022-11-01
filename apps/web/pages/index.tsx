import { Button, LoadingCircle } from "@spicy-soup/components";
import { trpc } from "../utils/trpc-client";
import type { TAppRouterInputs } from "../utils/trpc-client";
import styles from "./Home.module.scss";

const input: TAppRouterInputs["hello"]["world"] = { text: "New York" };
export default function Web() {
  const { data: healthCheck } = trpc.healthz.useQuery();
  const { data } = trpc.hello.world.useQuery(input);

  // const utils = trpc.useContext();
  return (
    <div className={styles.root}>
      <div className={styles.slant}>
        <div className={styles.content}>
          <LoadingCircle loading />
        </div>
      </div>
      <h1>Next JS App</h1>
      <b>Health: {healthCheck ?? "😔"}</b>
      <br />
      <b>Test: {data ?? "😔"}</b>
      <br />

      <Button>Popsicle</Button>
    </div>
  );
}
