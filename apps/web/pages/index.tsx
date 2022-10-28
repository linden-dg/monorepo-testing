import { Button, LoadingCircle } from "@spicy-soup/components";
import { trpc } from "@spicy-soup/trpc/client";
import type { TAppRouter } from "@spicy-soup/trpc/client";
import styles from "./Home.module.scss";

const input: TAppRouter["hello"]["world"]["input"] = { text: "New York" };
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
