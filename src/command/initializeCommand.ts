import * as process from "process";
import { ConfigRepository } from "../lib/repository/configRepository";
import { InitializeService } from "../lib/service/initializeService";

export function initializeCommand(): void {
  const workspacePath = process.cwd();

  const configRepository = new ConfigRepository();
  const initializeService = new InitializeService(configRepository);

  const result = initializeService.initialize(workspacePath);

  if (result.success) {
    console.log(`✅ ${result.message}`);
    if (result.isNewDirectory) {
      console.log(`📁 作業ディレクトリ: ${workspacePath}`);
    }
  } else {
    console.error(`❌ ${result.message}`);
    process.exit(1);
  }
}
