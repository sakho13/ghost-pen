import * as vscode from 'vscode';
import { ConfigRepository } from './lib/repository/configRepository';
import { InitializeService } from './lib/service/initializeService';
import { InitializeViewProvider } from './view/initializeViewProvider';

export function activate(context: vscode.ExtensionContext): void {

  const initDisposable = vscode.commands.registerCommand('ghost-pen.initialize', () => {
    const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspacePath) {
      vscode.window.showErrorMessage('ワークスペースが開かれていません');
      return;
    }

    const repo = new ConfigRepository();
    const service = new InitializeService(repo);
    const result = service.initialize(workspacePath);
    if (result.success) {
      vscode.window.showInformationMessage(result.message);
    } else {
      vscode.window.showErrorMessage(result.message);
    }
  });

  const viewProvider = new InitializeViewProvider();
  vscode.window.registerTreeDataProvider('ghostPenView', viewProvider);

  context.subscriptions.push(initDisposable);
}

export function deactivate(): void {}
