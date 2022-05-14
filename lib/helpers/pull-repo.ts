
import { Keypair, PublicKey } from "@solana/web3.js";
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

  const repo = await program.account.repoAccount.fetch(repoPDA);
  if (repo.commits.length === 0) {
    throw new Error("repo is empty");
  }
  return repo.commits[repo.commits.length - 1].hash;
};
