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

export async function commit(args: any) {
  exec(
    `git commit ${args.join(" ")}`,
    (error: any, stdout: any, stderr: any) => {
      if (error) {
        throw error;
        return;
      }
      console.log(stdout);
      console.log(stderr);
    }
  );
}
