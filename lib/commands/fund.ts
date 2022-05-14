import {
  Account,
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import path from "path";

import fetch from "node-fetch";

async function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function fund(keyPair?: Keypair) {
  console.clear();
  const homedir = require("os").homedir();

  console.log(chalk.gray("working..."));
  const config = JSON.parse(
    fs.readFileSync(path.join(homedir, ".gitsol", "config.json")).toString()
  );
  if (!config.registered) {
    console.log(
      chalk.red("You are not registered. Please register to continue.")
    );
    process.exit(0);
  }
  await fetch("https://api.devnet.solana.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "fc8ec408-2cc7-41ef-ba72-90d5568851a0",
      method: "requestAirdrop",
      params: [config.account, 5000000000],
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw err;
    });

  const connection = createConnection();
  console.clear();
  const balance = await connection.getBalance(new PublicKey(config.account));
  if (balance > 0) {
    console.log(chalk.green("Account is already funded."));
    process.exit(0);
  }
  console.log(chalk.grey(`Your gitsol account is not funded.`));
  console.log(chalk.grey(`Please fund your account on the devnet:`));
  console.log(chalk.grey(`Here's the address:`));
  console.log(chalk.green(`${config.account}`));
  console.log(chalk.grey(`waiting for funds to arrive...`));
  let funded = false;
  while (!funded) {
    await checkFunds();
    await sleep(1000);
  }
  async function checkFunds() {
    const balance = await connection.getBalance(new PublicKey(config.account));
    if (balance > 0) {
      funded = true;
    }
  }
}

function createConnection(url = clusterApiUrl("devnet")) {
  return new Connection(url);
}
