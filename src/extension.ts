import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';
import * as WebSocket from 'ws';

let serverProcess: cp.ChildProcess | null = null;
let wss: WebSocket.Server | null = null;

export function activate(context: vscode.ExtensionContext) {
    console.log('Auto-Reload extension is now active');

    let disposable = vscode.commands.registerCommand('extension.startAutoReload', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;
        startServer(rootPath);
        startWebSocketServer();

        const watcher = vscode.workspace.createFileSystemWatcher(
            new vscode.RelativePattern(rootPath, '**/*.{js,html,css}')
        );

        watcher.onDidChange(() => triggerReload());
        watcher.onDidCreate(() => triggerReload());
        watcher.onDidDelete(() => triggerReload());

        context.subscriptions.push(watcher);
    });

    context.subscriptions.push(disposable);
}

function startServer(rootPath: string) {
    if (serverProcess) {
        serverProcess.kill();
    }

    const mainFile = path.join(rootPath, 'index.js'); // Adjust this to your main server file
    serverProcess = cp.spawn('node', [mainFile], {
        cwd: rootPath,
        stdio: 'inherit'
    });

    vscode.window.showInformationMessage('Node.js server started');
}

function startWebSocketServer() {
    if (wss) {
        wss.close();
    }

    wss = new WebSocket.Server({ port: 3000 });
    
    wss.on('connection', (ws) => {
        console.log('Browser connected');
    });
}

function triggerReload() {
    if (wss) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('reload');
            }
        });
    }
    vscode.window.showInformationMessage('Triggered browser reload');
}

export function deactivate() {
    if (serverProcess) {
        serverProcess.kill();
    }
    if (wss) {
        wss.close();
    }
}