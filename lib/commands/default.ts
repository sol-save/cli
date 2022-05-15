const { exec } = require("child_process");

export async function def(command: string, args: any) {
  exec(`git ${command} ${args.join(" ")}`, (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.log(error.message);
    }
    console.log(stdout);
    console.log(stderr);
  });
}
