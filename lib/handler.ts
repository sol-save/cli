import { fund, unlock, init, push, pull, clone } from "./commands";
export async function handler(command: string, args: string[]) {
  switch (command) {
    case "fund": {
      await fund();
      break;
    }
    case "unlock": {
      await unlock();
      break;
    }
    case "init": {
      await init();
      break;
    }
    case "push": {
      await push();
      break;
    }
    case "pull": {
      await pull();
      break;
    }
    case "clone": {
      await clone();
      break;
    }
  }
}
