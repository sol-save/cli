import { fund, unlock, init, push } from "./commands";
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
  }
}
