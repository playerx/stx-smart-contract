import { StacksDevnetOrchestrator } from "@hirosystems/stacks-devnet-js";
import * as path from "path";

var devnet = new StacksDevnetOrchestrator({
  path: path.join(__dirname, "../Clarinet.toml"),
  logs: true,
  devnet: {},
});

beforeAll(() => devnet.start());
afterAll(() => devnet.stop());

test("build the block", async () => {
  const nodeUrl = devnet.getStacksNodeUrl();
  expect(nodeUrl).toBeTruthy();

  console.log("nodeUrl", nodeUrl);

  const block = await devnet.waitForStacksBlock();

  expect(block).toBeTruthy();
  expect(block.block_identifier.index).toBe(1);
});
