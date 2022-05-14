import chalk from "chalk";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
export const addCommit = async (
  authority: Keypair,
  program: Program,
  hash: string
) => {
  const [userPDA, _] = await PublicKey.findProgramAddress(
    [anchor.utils.bytes.utf8.encode("user"), authority.publicKey.toBuffer()],
    program.programId
  );
  const repo_id = (
    await program.account.userAccount.fetch(userPDA)
  ).repoCount.toNumber();
  const [repoPDA, repoBump] = await PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode("repo"),
      authority.publicKey.toBuffer(),
      new anchor.BN(repo_id).toArrayLike(Buffer),
    ],
    program.programId
  );
  //   console.log("repo pda ", repoPDA.toBase58(), repoBump);
  try {
    const tx = await program.methods
      .addCommit({
        hash: hash,
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
    console.log("Your transaction signature", tx);
  } catch (error) {
    console.log(chalk.red("🔴 Error in add-commit.ts:  ", error));
  }
};
