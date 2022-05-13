import path from "path";
const http = require("http"); // or 'https' for https:// URLs
const fs = require("fs-extra");
import fss from "fs";
const unzipper = require("unzipper");
import { exec } from "child_process";
export async function pull(repo: string) {
  console.log(repo);
  // TODO: interact with contract and get latest code.
  let latestCode =
    "http://ipfs.fleek.co/ipfs/bafybeiav5ysjomtretgwrslicxviuaaczdhhonrwbabcnnkcwlxi55iynq/1652463530777.zip";
  const ts = Date.now();
  const location = path.join(__dirname, "..", ".gitsol", `${ts}.zip`);
  const file = fs.createWriteStream(location);
  await http.get(latestCode, function (response: any) {
    response.pipe(file);
    file.on("finish", async () => {
      file.close();
      console.log("Download Completed");
      const gitPath = path.resolve("./.git");
      fs.emptyDirSync(gitPath);
      console.log("Unzipping");
      await fss
        .createReadStream(location)
        .pipe(unzipper.Extract({ path: gitPath }))
        .promise();
      console.log("Unzipped");
      exec("git stash", (err: any, stdout: any, stderr: any) => {
        if (err) {
          console.log(err);
        }
        console.log(stdout);
        console.log(stderr);
      });
      fs.unlinkSync(location);
    });
  });
}
