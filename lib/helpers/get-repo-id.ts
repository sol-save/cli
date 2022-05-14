
import { Keypair, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
export const getRepoId = async (authority: Keypair, program: Program) => {
  const [userPDA, x] = await PublicKey.findProgramAddress(
    [anchor.utils.bytes.utf8.encode("user"), authority.publicKey.toBuffer()],
    program.programId
  );
  const repo_id = (
    await program.account.userAccount.fetch(userPDA)
  ).repoCount.toNumber();
  return repo_id;
};
