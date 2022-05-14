import chalk from "chalk";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
export const createUser = async (
  authority: Keypair,
  program: Program,
  name: string,
  bio: string,
  socialLinks: string[],
  avatar: string
) => {
  console.log(chalk.grey("Creating user..."));
  const [userPDA, _] = await PublicKey.findProgramAddress(
    [anchor.utils.bytes.utf8.encode("user"), authority.publicKey.toBuffer()],
    program.programId
  );

  try {
    const tx = await program.methods
      .createUser({
        name: name,
        bio: bio,
        socialLinks: socialLinks,
        avatar: avatar,
      })
      .accounts({
        authority: authority.publicKey,
        userAccount: userPDA,
        systemProgram: SystemProgram.programId,
      })
      .signers([authority])
      .rpc();
    return tx;
  } catch (error) {
    console.log(chalk.red("🔴 Error in create-user.ts:  ", error));
  }
};
