const { exec } = require("child_process");

export async function commit(args: any) {
  exec(
    `git commit ${args.join(" ")}`,
    (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.log(error.message);
      }
      console.log(stdout);
      console.log(stderr);
    }
  );
}
