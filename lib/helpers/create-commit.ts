import chalk from "chalk";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
export const createCommit = async (
  authority: Keypair,
  program: Program,
  appId: number,
  hash: string
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
    const tx = await program.methods
      .addCommit({
        hash,
        timestamp: new Date().toISOString(),
      })
      .accounts({
        userAccount: userPDA,
        repoAccount: repoPDA,
        authority: authority.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([authority])
      .rpc();
    return tx;
  } catch (error) {
    console.log(chalk.red("🔴 Error in create-commit.ts:  ", error));
    throw new Error("failed");
  }
};
