const { Keypair } = require("@solana/web3.js");
import inquirer from "inquirer";
import chalk from "chalk";
import path from "path";
import fs from "fs";
import { create } from "./register";
import CryptoJS from "crypto-js";

export async function unlock(): Promise<any> {
  const config = JSON.parse(
    fs
      .readFileSync(path.join(__dirname, "..", ".gitsol", "config.json"))
      .toString()
  );
  if (!config.registered) {
    console.log(
      chalk.red("You are not registered. Please register to continue.")
    );
    await create();
    await unlock();
    return;
  }
  let keypair;
  let password;
  if (config.encrypted) {
    const answer = await inquirer.prompt([
      {
        type: "password",
        name: "password",
        message:
          "Enter your password to decrypt your keypair. (press enter if you had no password)",
      },
    ]);
    password = answer.password;
  } else {
    password = "default";
  }

  const encryptedAccount = fs
    .readFileSync(path.join(__dirname, "..", ".gitsol", "account"))
    .toString();
  try {
    const accountConfig = JSON.parse(
      CryptoJS.AES.decrypt(encryptedAccount, password).toString(
        CryptoJS.enc.Utf8
      )
    );
    let secretKey = Uint8Array.from(accountConfig.secretKey.split(","));
    keypair = Keypair.fromSecretKey(secretKey);
  } catch (e) {
    console.log(chalk.red("Incorrect password."));
    return await unlock();
  }

  if (keypair.publicKey.toString() === config.account) {
    return keypair;
  } else {
    console.log(chalk.red("Incorrect password."));
    return await unlock();
  }
}
