
import { Keypair, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
export const getRepoLists = async (authority: Keypair, program: Program) => {
  const [userPDA, x] = await PublicKey.findProgramAddress(
    [anchor.utils.bytes.utf8.encode("user"), authority.publicKey.toBuffer()],
    program.programId
  );
  const repo_id = (
    await program.account.userAccount.fetch(userPDA)
  ).repoCount.toNumber();
  let i = 0;
  const repoList = [];
  while (i < repo_id) {
    const [repoPDA, repoBump] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("repo"),
        authority.publicKey.toBuffer(),
        new anchor.BN(i).toArrayLike(Buffer),
      ],
      program.programId
    );
    const repo = await program.account.repoAccount.fetch(repoPDA);
    repoList.push({
      id: i,
      name: repo.profileInfo.name,
    });
    i++;
  }
  return repoList;
};
