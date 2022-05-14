#! /usr/bin/env node

"use strict";
import { handler } from "./handler";
import path from "path";
import chalk from "chalk";
import fs from "fs";
import { supportedCommands, create } from "./commands";
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
    console.log(logo);
    if (!fs.existsSync(path.join(__dirname, ".gitsol"))) {
      fs.mkdirSync(path.join(__dirname, ".gitsol"));
      fs.writeFileSync(
        path.join(__dirname, ".gitsol", "config.json"),
        JSON.stringify({
          registered: false,
        })
      );
      fs.writeFileSync(
        path.join(__dirname, ".gitsol", "apps.json"),
        JSON.stringify({})
      );
    }
    const config = JSON.parse(
      fs.readFileSync(path.join(__dirname, ".gitsol", "config.json")).toString()
    );
    console.log(chalk.green("Welcome to GitSol!"));

    if (!config.registered) {
      console.log(
        chalk.red("You are not registered. Please register to continue.")
      );
      await create();
    }
    if (args.length === 0) {
      console.log(chalk.blue(`Your gitsol account is ${config.account}`));
      console.log(chalk.grey("To see all commands, run : gitsol --help"));
      process.exit(0);
    }
    if (supportedCommands.includes(args[0])) {
      await handler(args[0], args.slice(1));
    } else {
      console.log(chalk.red(`Command ${args[0]} not found.`));
      console.log(chalk.red("You can run: gitsol --help"));
    }
  } catch (err: any) {
    console.log(chalk.red(`Error fetching latest examples: ${err.message}`));
    process.exit(1);
  }
})();
