import * as vscode from 'vscode';
import { ConfigRepository } from './lib/repository/configRepository';
import { InitializeService } from './lib/service/initializeService';
import { InitializeViewProvider } from './view/initializeViewProvider'

export function activate(context: vscode.ExtensionContext): void {
  const repo = new ConfigRepository()
  const service = new InitializeService(repo)

  const viewProvider = new InitializeViewProvider(repo)
  vscode.window.registerTreeDataProvider('ghostPenView', viewProvider)

  const initDisposable = vscode.commands.registerCommand('ghost-pen.initialize', () => {
    const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath
    if (!workspacePath) {
      vscode.window.showErrorMessage('ワークスペースが開かれていません')
      return
    }

    const result = service.initialize(workspacePath)
    if (result.success) {
      vscode.window.showInformationMessage(result.message)
      viewProvider.refresh()
    } else {
      vscode.window.showErrorMessage(result.message)
    }
  })

  context.subscriptions.push(initDisposable)
}

export function deactivate(): void {}
