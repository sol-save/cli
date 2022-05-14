import chalk from "chalk";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
export const createRepo = async (
  authority: Keypair,
  program: Program,
  name: string,
  description: string,
  socialLinks: string[],
  avatar: string,
  remote: string
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
      .createRepo({
        name: name,
        bio: description,
        socialLinks: socialLinks,
        remote: remote,
        avatar: avatar,
      })
      .accounts({
        repoAccount: repoPDA,
        authority: authority.publicKey,
        userAccount: userPDA,
        systemProgram: SystemProgram.programId,
      })
      .signers([authority])
      .rpc();
    return tx;
  } catch (error) {
    console.log(chalk.red("🔴 Error in create-repo.ts:  ", error));
  }
};
