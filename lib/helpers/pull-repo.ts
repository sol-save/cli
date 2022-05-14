import chalk from "chalk";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
export const pullRepo = async (
  authority: Keypair,
  program: Program,
  appId: number
) => {
  const [userPDA, x] = await PublicKey.findProgramAddress(
    [anchor.utils.bytes.utf8.encode("user"), authority.publicKey.toBuffer()],
    program.programId
  );
  const [repoPDA, repoBump] = await PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode("repo"),
      authority.publicKey.toBuffer(),
      new anchor.BN(appId).toArrayLike(Buffer),
    ],
    program.programId
  );

  try {
    const repo = await program.account.repoAccount.fetch(repoPDA);
    return repo.commits[repo.commits.length - 1].hash;
  } catch (error) {
    console.log(chalk.red("🔴 Error in create-commit.ts:  ", error));
    throw new Error("failed");
  }
};
