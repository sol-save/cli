import path from "path";
import fs from "fs-extra";
import { Web3Storage } from "web3.storage";
import { zip } from "zip-a-folder";

function makeStorageClient(token: string) {
  return new Web3Storage({ token });
}
import { getFilesFromPath } from "web3.storage";

export async function push() {
  const timestamp = Date.now();
  const config = JSON.parse(
    fs
      .readFileSync(path.join(__dirname, "..", ".gitsol", "config.json"))
      .toString()
  );
  const appPath = path.resolve("./");
  const zipPath = path.join(__dirname, "..", ".gitsol", `${timestamp}.zip`);
  await zip(`${appPath}/.git`, zipPath);
  const files = await getFilesFromPath(zipPath);
  const client = makeStorageClient(config.storagekey);
  const cid = await client.put(files);
  console.log(`http://ipfs.fleek.co/ipfs/${cid}/${timestamp}.zip`);
  // TODO contract interaction
}
