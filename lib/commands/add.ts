const { exec } = require("child_process");

export async function add(args: any) {
  exec(`git add ${args.join(" ")}`, (error: any, stdout: any, stderr: any) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
    console.log(stderr);
  });
}
