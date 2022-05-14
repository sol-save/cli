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
import { unlock } from "./unlock";
import { Contract } from "../utils/contract";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { airDropSol } from "../utils/airdrop";

async function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function fund() {
  const config = JSON.parse(
    fs
      .readFileSync(path.join(__dirname, "..", ".gitsol", "config.json"))
      .toString()
  );
  if (!config.registered) {
    console.log(
      chalk.red("You are not registered. Please register to continue.")
    );
    process.exit(0);
  }
  const connection = createConnection();
  console.clear();
  const balance = await connection.getBalance(new PublicKey(config.account));
  if (balance > 0) {
    console.log(chalk.green("Account is already funded."));
    process.exit(0);
  }
  console.log(chalk.green("Funding account..."));
  const account = await unlock();

  const { program } = Contract(Keypair.fromSecretKey(account.secretKey));

  await airDropSol(new PublicKey(account.publicKey), program, 2);
  console.log(chalk.grey(`Your gitsol account is not funded.`));
  console.log(chalk.grey(`To fund it, please send some SOL to it.`));
  console.log(chalk.grey(`Here's the address:`));
  console.log(chalk.green(`${config.account}`));
  console.log(chalk.grey(`waiting for funds...`));
  let funded = false;
  while (!funded) {
    await checkFunds();
    await sleep(2000);
  }
  async function checkFunds() {
    const balance = await connection.getBalance(new PublicKey(config.account));
    if (balance > 0) {
      funded = true;
    }
  }
  console.log(chalk.green("Account is funded!"));
}

function createConnection(url = clusterApiUrl("devnet")) {
  return new Connection(url);
}
