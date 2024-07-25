import * as vscode from "vscode";
import * as cp from "child_process";
import * as path from "path";
import * as WebSocket from "ws";

let serverProcess: cp.ChildProcess | null = null;
let wss: WebSocket.Server | null = null;
let statusBarItem: vscode.StatusBarItem;
let isActive = false;

function showTimedInformationMessage(message: string, duration: number = 3000) {
    const messagePromise = vscode.window.showInformationMessage(message);
    setTimeout(() => {
        messagePromise.then(item => {
            if (item) {
                (item as any).hide();
            }
        });
    }, duration);
}

export function activate(context: vscode.ExtensionContext) {
  console.log("Auto-Reload extension is now active");

  // Create status bar item
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.text = "$(sync) Start Auto-Reload";
  statusBarItem.command = "extension.toggleAutoReload";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  let toggleDisposable = vscode.commands.registerCommand(
    "extension.toggleAutoReload",
    () => {
      if (isActive) {
        stopAutoReload();
      } else {
        startAutoReload();
      }
    }
  );

  context.subscriptions.push(toggleDisposable);
}

function startAutoReload() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showErrorMessage("No workspace folder found");
    return;
  }

  const rootPath = workspaceFolders[0].uri.fsPath;
  startServer(rootPath);
  startWebSocketServer();

  const watcher = vscode.workspace.createFileSystemWatcher(
    new vscode.RelativePattern(
      rootPath,
      "**/*.{js,html,css,ejs,jsx,ts,tsx,scss,less,vue,svelte}"
    )
  );

  watcher.onDidChange(() => triggerReload());
  watcher.onDidCreate(() => triggerReload());
  watcher.onDidDelete(() => triggerReload());

  isActive = true;
  updateStatusBarItem();

  showTimedInformationMessage("Auto-Reload started");
}

function stopAutoReload() {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
  if (wss) {
    wss.close();
    wss = null;
  }

  isActive = false;
  updateStatusBarItem();

  showTimedInformationMessage("Auto-Reload stopped");
}

function startServer(rootPath: string) {
  if (serverProcess) {
    serverProcess.kill();
  }

  const mainFile = path.join(rootPath, "index.js"); // Adjust this to your main server file
  serverProcess = cp.spawn("node", [mainFile], {
    cwd: rootPath,
    stdio: "inherit",
  });

  serverProcess.on("error", (err) => {
    vscode.window.showErrorMessage(`Failed to start server: ${err.message}`);
  });

  showTimedInformationMessage('Node.js server started');
}

function startWebSocketServer() {
  if (wss) {
    wss.close();
  }

  const port = vscode.workspace
    .getConfiguration("autoReload")
    .get("websocketPort", 8080);

  wss = new WebSocket.Server({ port });

  wss.on("connection", (ws) => {
    console.log("Browser connected");
    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  wss.on("error", (error) => {
    vscode.window.showErrorMessage(`WebSocket server error: ${error.message}`);
  });

  showTimedInformationMessage(`WebSocket server started on port ${port}`);
}

function triggerReload() {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send("reload");
      }
    });
  }
  // Uncomment the following line if you want to show a message on each reload
  // showTimedInformationMessage("Triggered browser reload");
}

function updateStatusBarItem() {
  if (isActive) {
    statusBarItem.text = "$(sync~spin) Auto-Reload Active";
    statusBarItem.tooltip = "Click to stop Auto-Reload";
  } else {
    statusBarItem.text = "$(sync) Start Auto-Reload";
    statusBarItem.tooltip = "Click to start Auto-Reload";
  }
}

export function deactivate() {
  stopAutoReload();
}