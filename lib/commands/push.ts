import path from "path";
import fs from "fs-extra";
import { Web3Storage } from "web3.storage";
import { zip } from "zip-a-folder";
import chalk from "chalk";
function makeStorageClient(token: string) {
  return new Web3Storage({ token });
}
import { getFilesFromPath } from "web3.storage";
import { createCommit } from "../helpers/create-commit";
import { unlock } from "./unlock";
import * as anchor from "@project-serum/anchor";
import { GitSol } from "../utils/git_sol";
// const idl:GitSol = require("../utils/idl.json");
import { idl } from "../utils/idl";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { Program } from "@project-serum/anchor";

import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";

export async function push() {
  const currentPath = path.resolve("./");
  const appConfig = JSON.parse(
    fs
      .readFileSync(path.join(__dirname, "..", ".gitsol", "apps.json"))
      .toString()
  );

  if (appConfig[currentPath] === undefined) {
    console.log(
      chalk.red("Current directory is not a repo! Try `gitsol init`")
    );
    process.exit(1);
  }

  const timestamp = Date.now();
  const config = JSON.parse(
    fs
      .readFileSync(path.join(__dirname, "..", ".gitsol", "config.json"))
      .toString()
  );
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
  console.clear();
  console.log(chalk.grey("creating commit..."));
  const appPath = path.resolve("./");
  const zipPath = path.join(__dirname, "..", ".gitsol", `${timestamp}.zip`);
  await zip(`${appPath}/.git`, zipPath);
  const files = await getFilesFromPath(zipPath);
  const client = makeStorageClient(config.storagekey);
  const cid = await client.put(files);
  console.clear();
  console.log(chalk.grey("pushing commit..."));
  const tx = await createCommit(
    keyPair,
    program,
    appConfig[currentPath],
    `${cid}/${timestamp}.zip`
  );
  console.log(chalk.green("commit pushed at ", tx));
}
