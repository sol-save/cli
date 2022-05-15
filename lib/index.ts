#! /usr/bin/env node

"use strict";
import { handler } from "./handler";
import path from "path";
import chalk from "chalk";
import fs from "fs";
import { create } from "./commands";
const args = process.argv.slice(2);

console.clear();

export const logo = `
         **   **                     **
  ***** //   /**                    /**
 **///** ** ******  ******  ******  /**
/**  /**/**///**/  **////  **////** /**
//******/**  /**  //***** /**   /** /**
 /////**/**  /**   /////**/**   /** /**
  ***** /**  //**  ****** //******  ***
 /////  //    //  //////   //////  ///                             
`;

(async () => {
  try {
    const homedir = require("os").homedir();

    if (!fs.existsSync(path.resolve(homedir, ".gitsol"))) {
      fs.mkdirSync(path.resolve(homedir, ".gitsol"));
      fs.writeFileSync(
        path.resolve(homedir, ".gitsol", "config.json"),
        JSON.stringify({
          registered: false,
        })
      );
      fs.writeFileSync(
        path.resolve(homedir, ".gitsol", "apps.json"),
        JSON.stringify({})
      );
    }
    const config = JSON.parse(
      fs
        .readFileSync(path.resolve(homedir, ".gitsol", "config.json"))
        .toString()
    );

    if (!config.registered) {
      console.log(
        chalk.red("You are not registered. Please register to continue.")
      );
      await create();
    }
    if (args.length === 0) {
      console.log(logo);
      console.log(chalk.green("Welcome to GitSol!"));
      console.log(chalk.blue(`Your gitsol account is ${config.account}`));
      process.exit(0);
    }
    await handler(args[0], args.slice(1));
  } catch (err: any) {
    console.log(
      chalk.red(`🚨 error while carrying out command: ${err.message}`)
    );
    process.exit(1);
  }
})();
