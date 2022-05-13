import path from "path";
import { unlock } from "./unlock";
import inquirer from "inquirer";
import generator from "project-name-generator";
import chalk from "chalk";
import fs from "fs";
const { exec } = require("child_process");

export async function init() {
  const p = path.resolve("./");
  exec("git init", (error: any, stdout: any, stderr: any) => {});
  exec(
    "git add . && git commit -m 'automated commit from gitsol'",
    (error: any, stdout: any, stderr: any) => {}
  );
  const keypair = await unlock();
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
  console.log(chalk.green("Creating project..."));
  // TODO interact with contract and get xyz app id
  const appId = "xyz";
  const apps = JSON.parse(
    fs
      .readFileSync(path.join(__dirname, "..", ".gitsol", "apps.json"))
      .toString()
  );
  apps[p] = appId;

  fs.writeFileSync(
    path.join(__dirname, "..", ".gitsol", "apps.json"),
    JSON.stringify(apps)
  );
  console.log(chalk.green("Project created!"));
}
