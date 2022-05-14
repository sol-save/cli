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
import { clusterApiUrl, Connection, PublicKey, Keypair } from "@solana/web3.js";
import { unlock } from "./unlock";
import { pullRepo } from "../helpers/pull-repo";

export async function pull(keyPair: Keypair) {
  console.clear();
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
  console.log(chalk.grey("fetching repo info..."));
  const repo = await pullRepo(keyPair, program, appConfig[currentPath]);
  let latestCode = `https://ipfs.fleek.co/ipfs/${repo}`;
  const ts = Date.now();
  const location = path.join(__dirname, "..", ".gitsol", `${ts}.zip`);
  const file = fs.createWriteStream(location);
  console.clear();
  console.log(chalk.gray("cloning repo..."));
  return await http.get(latestCode, function (response: any) {
    response.pipe(file);
    file.on("finish", async () => {
      file.close();
      console.clear();
      console.log(chalk.gray("setting up local git..."));
      const gitPath = path.resolve("./.git");
      fs.emptyDirSync(gitPath);
      console.clear();
      console.log(chalk.gray("unzipping config..."));
      await fs
        .createReadStream(location)
        .pipe(unzipper.Extract({ path: gitPath }))
        .promise();
      console.clear();
      console.log(chalk.gray("applying changes..."));
      exec("git stash", (err: any, stdout: any, stderr: any) => {
        if (err) {
          throw err;
        }
      });
      console.clear();
      console.log(chalk.gray("cleaning up..."));
      await fs.unlinkSync(location);
      console.clear();
      console.log(chalk.green("successfully pulled!"));
    });
  });
}
