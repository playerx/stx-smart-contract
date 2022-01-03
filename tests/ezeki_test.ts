import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
} from "https://deno.land/x/clarinet@v0.14.0/index.ts";
import { assertEquals } from "https://deno.land/std@0.90.0/testing/asserts.ts";

const contractName = "ezeki4";

Clarinet.test({
  name: "Ensure that block height increases",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let block = chain.mineBlock([
      /*
       * Add transactions with:
       * Tx.contractCall(...)
       */
    ]);
    assertEquals(block.receipts.length, 0);
    assertEquals(block.height, 2);

    block = chain.mineBlock([
      /*
       * Add transactions with:
       * Tx.contractCall(...)
       */
    ]);
    assertEquals(block.receipts.length, 0);
    assertEquals(block.height, 3);
  },
});

Clarinet.test({
  name: "Should call hi",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const sender = accounts.get("deployer")!.address;

    const block = chain.mineBlock([
      Tx.contractCall(contractName, "say-hi", [], sender),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);

    const inner = block.receipts[0].result.expectOk();
    inner.expectUtf8("hello world");
  },
});

Clarinet.test({
  name: "Should call echo",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const sender = accounts.get("deployer")!.address;

    const block = chain.mineBlock([
      /*
       * Add transactions with:
       * Tx.contractCall(...)
       */
      Tx.contractCall(contractName, "echo", ["1"], sender),
    ]);
    assertEquals(block.height, 2);

    const inner = block.receipts[0].result.expectOk();
    inner.expectInt(1);
  },
});
