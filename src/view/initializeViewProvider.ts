import * as vscode from 'vscode';

export class InitializeViewProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  readonly onDidChangeTreeData?: vscode.Event<void | vscode.TreeItem | null | undefined>;

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: vscode.TreeItem | undefined): vscode.ProviderResult<vscode.TreeItem[]> {
    if (element) {
      return [];
    }
    const item = new vscode.TreeItem('Initialize', vscode.TreeItemCollapsibleState.None);
    item.command = { command: 'ghost-pen.initialize', title: 'Initialize Workspace' };
    item.iconPath = new vscode.ThemeIcon('rocket');
    return [item];
  }
}
