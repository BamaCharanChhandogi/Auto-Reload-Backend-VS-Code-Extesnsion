# Auto Reload Backend - VS Code Extension

## Overview

Auto Reload Backend for VS Code is a powerful extension designed to streamline your web development workflow. It automatically detects changes in your project files and triggers a reload of your Node.js backend, eliminating the need for manual restarts. This extension works in tandem with the Auto Reload Backend browser extension to provide a seamless development experience.

## Features

- Auto-restart Node.js server automatically when backend files are modified.
- WebSocket communication establishes a WebSocket connection to communicate with the browser extension.
- Customizable file watching configures which file types and directories trigger reloads.
- Status indicators provide clear visual feedback in VS Code about the server status.

## Requirements

- Visual Studio Code v1.60.0 or higher
- Node.js v12.0.0 or higher
- Auto Reload Backend browser extension installed in your web browser

## Installation

1. Open Visual Studio Code
2. Go to the Extensions view (Ctrl+Shift+P or Cmd+Shift+P, then type "Extensions")
3. Search for "Auto Reload Backend"
4. Click Install

## Usage

1. Open your web project in VS Code.
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to open the Command Palette.
3. Type "Start Auto Reload Backend" and select the command to activate the extension.
4. The extension will now watch for file changes and handle backend reloads automatically.

## Configuration

You can customize the extension's behavior in your VS Code settings:

```json
{
  "autoReloadBackend.watchFolders": ["src", "server"],
  "autoReloadBackend.fileTypes": [".js", ".ts", ".json"],
  "autoReloadBackend.delay": 100,
  "autoReloadBackend.port": 3000
}
```

- `watchFolders`: Specifies which folders to watch for changes.
- `fileTypes`: Defines which file types should trigger a reload.
- `delay`: Sets a delay (in milliseconds) before triggering a reload after a file change.
- `port`: The port number your Node.js server is running on.

## Troubleshooting

If you encounter any issues:

1. Ensure you have the latest version of both the VS Code extension and the browser extension installed.
2. Check that your Node.js version is compatible.
3. Verify that the WebSocket connection is established (you should see a status indicator in VS Code).
4. If problems persist, please file an issue on our GitHub repository.

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to get involved.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Support

If you need help or have questions, please:

- Check our [FAQ](FAQ.md)
- File an issue on our [GitHub repository](https://github.com/yourusername/vscode-auto-reload-backend)
- Contact us at support@autoreloadbackend.com

Thank you for using Auto Reload Backend for VS Code!
