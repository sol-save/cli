import { fund, unlock, init, push, pull, clone, commit, add, def } from "./commands";
export async function handler(command: string, args: string[]) {
  const keyPair = await unlock();
  switch (command) {
    case "fund": {
      await fund(keyPair);
      break;
    }
    case "unlock": {
      await unlock(keyPair);
      break;
    }
    case "init": {
      await init(keyPair);
      break;
    }
    case "push": {
      await push(keyPair);
      break;
    }
    case "pull": {
      await pull(keyPair);
      break;
    }
    case "clone": {
      await clone(keyPair);
      break;
    }
    case "commit": {
      await commit(args);
      break;
    }
    case "add": {
      await add(args);
      break;
    }
    default: {
      await def(command, args);
      break;
    }
  }
}
