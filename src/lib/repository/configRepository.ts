import * as fs from "fs";
import * as path from "path";
import { Config } from "../../type/config";
import { IConfigRepository } from "./IConfigRepository";

export class ConfigRepository implements IConfigRepository {
  private readonly _ghostPenDirName = ".ghost-pen";
  private readonly _configFileName = "config.json";

  public hasGhostPenDirectory(workspacePath: string): boolean {
    const ghostPenPath = path.join(workspacePath, this._ghostPenDirName);
    return (
      fs.existsSync(ghostPenPath) && fs.statSync(ghostPenPath).isDirectory()
    );
  }

  public hasConfigFile(workspacePath: string): boolean {
    const configPath = this._getConfigPath(workspacePath);
    return fs.existsSync(configPath) && fs.statSync(configPath).isFile();
  }

  public createGhostPenDirectory(workspacePath: string): void {
    const ghostPenPath = path.join(workspacePath, this._ghostPenDirName);
    fs.mkdirSync(ghostPenPath, { recursive: true });
  }

  public createConfigFile(workspacePath: string, config: Config): void {
    const configPath = this._getConfigPath(workspacePath);
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
  }

  public readConfigFile(workspacePath: string): Config {
    const configPath = this._getConfigPath(workspacePath);
    const configData = fs.readFileSync(configPath, "utf8");
    return JSON.parse(configData);
  }

  private _getConfigPath(workspacePath: string): string {
    return path.join(
      workspacePath,
      this._ghostPenDirName,
      this._configFileName
    );
  }

  private _getGhostPenPath(workspacePath: string): string {
    return path.join(workspacePath, this._ghostPenDirName);
  }
}
