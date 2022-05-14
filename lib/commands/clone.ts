import path from "path";
const http = require("https"); // or 'https' for https:// URLs
const fs = require("fs-extra");
import fss from "fs";
const unzipper = require("unzipper");
import { exec } from "child_process";
import chalk from "chalk";
import * as anchor from "@project-serum/anchor";
import { idl } from "../utils/idl";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { Program } from "@project-serum/anchor";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { unlock } from "./unlock";
import { pullRepo } from "../helpers/pull-repo";
import { getRepoId } from "../helpers/get-repo-id";
import { getRepoLists } from "../helpers/clone-repo";
import inquirer from "inquirer";
import { pull } from "./pull";

export async function clone() {
  const currentPath = path.resolve("./");
  const appConfig = JSON.parse(
    fs
      .readFileSync(path.join(__dirname, "..", ".gitsol", "apps.json"))
      .toString()
  );

  if (appConfig[currentPath] !== undefined) {
    console.log(
      chalk.red(
        "Current directory is already a repo on gitsol! Try somewhere else"
      )
    );
    process.exit(1);
  }
  const keyPair = await unlock();
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
  const repos = await getRepoLists(keyPair, program);
  const { chosenId } = await inquirer.prompt([
    {
      type: "list",
      name: "chosenId",
      choices: repos.map((repo) => {
        return {
          name: repo.name,
          value: repo.id,
        };
      }),
    },
  ]);
  exec("git init", (error: any, stdout: any, stderr: any) => {});

  const apps = JSON.parse(
    fs
      .readFileSync(path.join(__dirname, "..", ".gitsol", "apps.json"))
      .toString()
  );
  apps[currentPath] = chosenId;
  fs.writeFileSync(
    path.join(__dirname, "..", ".gitsol", "apps.json"),
    JSON.stringify(apps)
  );
  await pull();
}
