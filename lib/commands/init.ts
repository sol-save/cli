import path from "path";
import inquirer from "inquirer";
import generator from "project-name-generator";
import chalk from "chalk";
import fs from "fs";
import { createRepo } from "../helpers/create-repo";
const { exec } = require("child_process");
import * as anchor from "@project-serum/anchor";
// const idl:GitSol = require("../utils/idl.json");
import { idl } from "../utils/idl";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { Program } from "@project-serum/anchor";

import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";

export async function init(keyPair: Keypair) {
  const homedir = require("os").homedir();

  const p = path.resolve("./");
  exec("git init", (error: any, stdout: any, stderr: any) => {});
  exec(
    "git add . && git commit -m 'automated commit from gitsol'",
    (error: any, stdout: any, stderr: any) => {}
  );

  const { name, description, license } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter a name for your project",
      default: generator().dashed,
    },
    {
      type: "input",
      name: "description",
      message: "Enter a description for your project",
      default: "My project",
    },
    {
      type: "list",
      name: "license",
      message: "Enter a license for your project",
      choices: [
        { name: "MIT", value: "MIT" },
        { name: "Apache", value: "Apache" },
        { name: "ISC", value: "ISC" },
        { name: "BSD", value: "BSD" },
        { name: "GPL", value: "GPL" },
        { name: "MPL", value: "MPL" },
        { name: "Unlicense", value: "Unlicense" },
        { name: "Public Domain", value: "Public Domain" },
      ],
    },
  ]);
  console.clear();
  console.log(chalk.grey("🪐 creating project..."));
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
  const appId = await createRepo(keyPair, program, name, description);
  const apps = JSON.parse(
    fs.readFileSync(path.join(homedir, ".gitsol", "apps.json")).toString()
  );
  apps[p] = appId;

  fs.writeFileSync(
    path.join(homedir, ".gitsol", "apps.json"),
    JSON.stringify(apps)
  );
  console.clear();
  console.log(chalk.green("project created on chain!"));
}
