import { createUser } from "./../helpers/create-user";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import inquirer from "inquirer";
import chalk from "chalk";
import CryptoJS from "crypto-js";
import fs from "fs";
import path from "path";
import * as anchor from "@project-serum/anchor";
import { GitSol } from "../utils/git_sol";
// const idl:GitSol = require("../utils/idl.json");
import { idl } from "../utils/idl";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { Program } from "@project-serum/anchor";
import { airDropSol } from "../utils/airdrop";
import { fund } from ".";

export async function create() {
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
  fs.writeFileSync(
    path.join(__dirname, "..", ".gitsol", "account"),
    encryptedAccount
  );
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
    fs
      .readFileSync(path.join(__dirname, "..", ".gitsol", "config.json"))
      .toString()
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
    path.join(__dirname, "..", ".gitsol", "config.json"),
    JSON.stringify(config)
  );
  console.log(chalk.green("Created account!"));
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

  // TODO; contract integration
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
  // console.clear();
  // console.log(chalk.grey("airdropping sol..."));
  // await airDropSol(keyPair.publicKey, program, 2);
  console.clear();
  console.log(chalk.grey("creating user on chain..."));
  await createUser(keyPair, program, name, bio, socials, avatar);
  console.clear();
  console.log(chalk.green("You're all set!"));
  console.log(chalk.grey("Create a new repo by running:"));
  console.log(chalk.green("`gitsol init`"));
  process.exit(0);
}
