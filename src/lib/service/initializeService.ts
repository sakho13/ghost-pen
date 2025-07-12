import { IConfigRepository } from "../repository/IConfigRepository";
import { Config, InitializeResult } from "../../type/config";

export class InitializeService {
  private readonly _configRepository: IConfigRepository;
  private readonly _defaultConfigVersion = "0.0.1";

  public constructor(configRepository: IConfigRepository) {
    this._configRepository = configRepository;
  }

  public initialize(workspacePath: string): InitializeResult {
    try {
      const hasGhostPen =
        this._configRepository.hasGhostPenDirectory(workspacePath);

      if (hasGhostPen) {
        const hasConfig = this._configRepository.hasConfigFile(workspacePath);
        if (hasConfig) {
          return {
            success: true,
            message: ".ghost-pen ディレクトリは既に初期化されています",
            isNewDirectory: false,
          };
        }
      }

      if (!hasGhostPen) {
        this._configRepository.createGhostPenDirectory(workspacePath);
      }

      const defaultConfig: Config = {
        configVersion: this._defaultConfigVersion,
      };

      this._configRepository.createConfigFile(workspacePath, defaultConfig);

      return {
        success: true,
        message: ".ghost-pen ディレクトリを初期化しました",
        isNewDirectory: !hasGhostPen,
      };
    } catch (error) {
      return {
        success: false,
        message: `初期化中にエラーが発生しました: ${
          error instanceof Error ? error.message : String(error)
        }`,
        isNewDirectory: false,
      };
    }
  }
}
