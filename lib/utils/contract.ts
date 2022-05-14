import * as anchor from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { idl } from "./idl";
export const Contract = (
  keyPair: Keypair
): {
  program: anchor.Program;
  provider: anchor.AnchorProvider;
} => {
  const provider = new anchor.AnchorProvider(
    new Connection(clusterApiUrl("devnet")),
    new NodeWallet(keyPair),
    {
      preflightCommitment: "recent",
    }
  );
  const program = new anchor.Program(
    idl as anchor.Idl,
    new PublicKey("7PsWEzPcGpdUWdVE4ogMiV9xCKeyjPBsxHcchotwx4cX"),
    provider
  );
  return {
    provider,
    program,
  };
};
