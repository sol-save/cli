import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { Program } from "@project-serum/anchor";
import { idl } from "./lib/utils/idl";
import { createUser } from "./lib/helpers/create-user";
import chalk from "chalk";
import { airDropSol } from "./lib/utils/airdrop";
const test = async () => {
  const keyPair = Keypair.generate();
  const provider = new anchor.AnchorProvider(
    new Connection(clusterApiUrl("devnet")),
    new NodeWallet(keyPair),
    {
      preflightCommitment: "recent",
    }
  );
  const program = new Program(
    idl as anchor.Idl,
    new PublicKey("7PsWEzPcGpdUWdVE4ogMiV9xCKeyjPBsxHcchotwx4cX"),
    provider
  );
  await airDropSol(keyPair.publicKey, program, 2);
  const user_account_reponse = await createUser(
    keyPair,
    program,
    "name",
    "bio",
    ["socials"],
    "avatar"
  );
  console.log(chalk.greenBright("Account created!", user_account_reponse));
};

test().then(() => {
  console.log(chalk.green("Done!"));
});
