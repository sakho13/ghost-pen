import { Config } from '../../type/config'

export interface IConfigRepository {
  /**
   * 指定されたワークスペースパスに .ghost-pen ディレクトリが存在するかを確認します
   * @param workspacePath ワークスペースのパス
   * @returns .ghost-pen ディレクトリが存在する場合は true、そうでなければ false
   */
  hasGhostPenDirectory(workspacePath: string): boolean

  /**
   * 指定されたワークスペースパスの .ghost-pen ディレクトリ内に config.json ファイルが存在するかを確認します
   * @param workspacePath ワークスペースのパス
   * @returns config.json ファイルが存在する場合は true、そうでなければ false
   */
  hasConfigFile(workspacePath: string): boolean

  /**
   * 指定されたワークスペースパスに .ghost-pen ディレクトリを作成します
   * @param workspacePath ワークスペースのパス
   */
  createGhostPenDirectory(workspacePath: string): void

  /**
   * 指定されたワークスペースパスの .ghost-pen ディレクトリ内に config.json ファイルを作成します
   * @param workspacePath ワークスペースのパス
   * @param config 書き込む設定データ
   */
  createConfigFile(workspacePath: string, config: Config): void

  /**
   * 指定されたワークスペースパスの .ghost-pen ディレクトリ内の config.json ファイルを読み取ります
   * @param workspacePath ワークスペースのパス
   * @returns 読み取った設定データ
   */
  readConfigFile(workspacePath: string): Config

  /**
   * ワークスペースが初期化済みかを確認します
   * @param workspacePath ワークスペースのパス
   * @returns 初期化済みならtrue、未初期化ならfalse
   */
  isInitialized(workspacePath: string): boolean
}
