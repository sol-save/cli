import path from "path";
import fs from "fs";

export function updateConfig(updatedConfig: Object) {
  const config = JSON.parse(
    fs
      .readFileSync(path.join(__dirname, "..", ".gitsol", "config.json"))
      .toString()
  );
  const newConfig = Object.assign(config, updatedConfig);
  fs.writeFileSync(
    path.join(__dirname, "..", ".gitsol", "config.json"),
    JSON.stringify(newConfig)
  );
  return newConfig;
}
