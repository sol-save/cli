import { createUser } from "./../helpers/create-user";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import inquirer from "inquirer";
import chalk from "chalk";
import CryptoJS from "crypto-js";
import fs from "fs";
import path from "path";

import { fund } from "./fund";

import * as anchor from "@project-serum/anchor";
import { idl } from "../utils/idl";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { Program } from "@project-serum/anchor";

export async function create() {
  const homedir = require("os").homedir();

  const keyPair = Keypair.generate();
  let confirmPassword;
  let { password } = await inquirer.prompt([
    {
      type: "password",
      name: "password",
      message:
        "Enter a password to encrypt your keypair. (enter to skip encryption)",
    },
  ]);
  if (password !== "") {
    const answer = await inquirer.prompt([
      {
        type: "password",
        name: "confirmPassword",
        message: "Confirm your password (enter to skip)",
      },
    ]);
    confirmPassword = answer.confirmPassword;
    if (password !== confirmPassword) {
      console.log(chalk.red("Passwords do not match."));
      await create();
      return;
    }
  } else {
    console.log(chalk.yellow("No password provided. Skipping encryption."));
    confirmPassword = "default";
  }

  const account = {
    publicKey: keyPair.publicKey.toString(),
    secretKey: keyPair.secretKey.toString(),
  };

  const encryptedAccount = CryptoJS.AES.encrypt(
    JSON.stringify(account),
    confirmPassword
  ).toString();
  fs.writeFileSync(path.join(homedir, ".gitsol", "account"), encryptedAccount);
  console.clear();
  console.log(chalk.grey("Decentralised Hosting"));
  console.log(chalk.grey("======================"));
  console.log(chalk.grey("1. Go to https://web3.storage/login/"));
  console.log(chalk.grey("2. Create a free account"));
  console.log(chalk.grey("3. Create a new API key"));
  console.log(chalk.grey("4. Copy the API key"));
  const { web3StrorageApiKey } = await inquirer.prompt([
    {
      type: "input",
      name: "web3StrorageApiKey",
      message: "5. Paste the API key here:",
    },
  ]);

  const config = JSON.parse(
    fs.readFileSync(path.join(homedir, ".gitsol", "config.json")).toString()
  );
  if (confirmPassword === "default") {
    config.encrypted = false;
  } else {
    config.encrypted = true;
  }

  config.registered = true;
  config.account = keyPair.publicKey.toString();
  config.storagekey = web3StrorageApiKey;
  fs.writeFileSync(
    path.join(homedir, ".gitsol", "config.json"),
    JSON.stringify(config)
  );
  await fund();
  console.clear();
  let { name, socials, bio, github } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter your name:",
    },
    {
      type: "input",
      name: "socials",
      message: "Enter your social media links (separated by comma):",
    },
    {
      type: "input",
      name: "bio",
      message: "Enter your bio:",
    },
    {
      type: "input",
      name: "github",
      message: "Enter your github username:",
    },
  ]);
  socials = socials.split(",");
  const avatar = `https://github.com/${github}.png`;

  const provider = new anchor.AnchorProvider(
    new Connection(clusterApiUrl("devnet")),
    new NodeWallet(keyPair),
    {
      preflightCommitment: "recent",
    }
  );
  const program = new Program(
    idl as anchor.Idl,
    new PublicKey("7PsWEzPcGpdUWdVE4ogMiV9xCKeyjPBsxHcchotwx4cX"),
    provider
  );

  console.clear();
  console.log(chalk.grey("???? creating user on solana chain..."));
  await createUser(keyPair, program, name, bio, socials, avatar);
  console.clear();

  console.log(chalk.green("You're all set!"));
  console.log(chalk.grey("Create a new repo by running:"));
  console.log(chalk.green("`gitsol init`"));
  process.exit(0);
}
