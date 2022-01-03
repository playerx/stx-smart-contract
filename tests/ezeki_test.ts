import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
} from "https://deno.land/x/clarinet@v0.14.0/index.ts";
import { assertEquals } from "https://deno.land/std@0.90.0/testing/asserts.ts";

Clarinet.test({
  name: "Ensure that <...>",
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

    let block = chain.mineBlock([
      Tx.contractCall("ezeki", "say-hi", [], sender),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);

    const inner = block.receipts[0].result.expectOk();
    const tuple = inner.expectUtf8("hello world");

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
