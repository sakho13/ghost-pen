import * as vscode from 'vscode'
import { IConfigRepository } from '../lib/repository/IConfigRepository'
import { COMMAND_TITLE_INITIALIZE, TREE_LABEL_INITIALIZE } from '../constant'

export class InitializeViewProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  private readonly _configRepository: IConfigRepository
  private readonly _onDidChangeTreeData = new vscode.EventEmitter<void>()
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event

  /**
   * コンストラクター
   * @param configRepository 設定リポジトリ
   */
  public constructor(configRepository: IConfigRepository) {
    this._configRepository = configRepository
  }

  /**
   * ビューを更新します
   */
  public refresh(): void {
    this._onDidChangeTreeData.fire()
  }

  /**
   * TreeItem を取得します
   * @param element TreeItem
   * @returns TreeItem
   */
  public getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element
  }

  /**
   * 子要素を取得します
   * @param element TreeItem
   * @returns 子要素の配列
   */
  public getChildren(element?: vscode.TreeItem | undefined): vscode.ProviderResult<vscode.TreeItem[]> {
    if (element) {
      return []
    }
    const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath
    if (!workspacePath) {
      return []
    }
    if (this._configRepository.isInitialized(workspacePath)) {
      return []
    }
    const item = new vscode.TreeItem(TREE_LABEL_INITIALIZE, vscode.TreeItemCollapsibleState.None)
    item.command = { command: 'ghost-pen.initialize', title: COMMAND_TITLE_INITIALIZE }
    item.iconPath = new vscode.ThemeIcon('rocket')
    return [item]
  }
}
