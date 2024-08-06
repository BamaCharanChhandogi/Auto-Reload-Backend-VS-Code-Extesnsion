# Auto Reload Backend - VS Code Extension

## Boost Your Web Development Productivity with Automatic Node.js and Browser Reloading

## Overview

Auto Reload Backend is a powerful Visual Studio Code extension that revolutionizes your web development workflow. It automatically reloads your Node.js backend and refreshes your browser when file changes are detected, eliminating the need for manual restarts and browser refreshes. Supercharge your coding efficiency with Auto Reload Backend!

## 🚀 Key Features

- Automatic Node.js Server Restart: Instantly restarts your backend when server-side files change
- Browser Auto-Refresh: Automatically reloads your browser for frontend updates
- WebSocket Communication: Establishes a fast, reliable connection with the browser extension
- Multi-Language Support: Works with JavaScript, TypeScript, HTML, CSS, EJS, React, Vue, Svelte, and more
- Customizable Settings: Tailor the extension to your specific project needs
- Visual Feedback: Clear status indicators in VS Code for server and connection statu

## 🛠️ Requirements

- Visual Studio Code v1.60.0 or higher
- Node.js v12.0.0 or higher
- Auto Reload Backend browser extension (available for Chrome, Firefox, Edge, and Safari)

## 📦 Installation

1. Open Visual Studio Code
2. Go to the Extensions view (Ctrl+Shift+P or Cmd+Shift+P, then type "Extensions")
3. Search for "Auto Reload Backend"
4. Click Install

## 🔧 Usage

1. Open your web project in VS Code.
2. Look for the "Auto Reload Active" button in the VS Code status bar
3. Click the "Auto Reload Active" button to toggle the extension on or off
4. When active, start coding and watch your changes instantly appear in the browser!

The "Auto Reload Active" button will change appearance to indicate whether the auto-reload feature is currently on or off.


### 🚦 Status Indicator: 
The "Auto Reload Active" button serves as a status indicator:
- **Green**: Auto-reload is active and functioning
- **Red**: Auto-reload is inactive
- **Yellow**: Auto-reload is active but there might be a connection issue


Note: Ensure that your Node.js server is running and that you have the Auto Reload Backend browser extension installed for full functionality

## ⚙️ Configuration

You can customize the extension's behavior in your VS Code settings:

```json
{
  "autoReloadBackend.websocketPort": 8080,
  "autoReloadBackend.watchFolders": ["src", "public"],
  "autoReloadBackend.fileTypes": [".js", ".ts", ".html", ".css"]
}
```

- `websocketPort`:  Set the port for the WebSocket server (default: 8080).
- `watchFolders`: Specify which folders to watch for change
- `fileTypes`: Define which file types should trigger a reload

## 🔍 Troubleshooting

If you encounter any issues:

1. Ensure you have the latest version of both the VS Code extension and the browser extension installed.
2. Check that your Node.js version is compatible.
3. Verify that the WebSocket connection is established (you should see a status indicator in VS Code).
4. If problems persist, please file an issue on our GitHub repository.

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to get involved.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🆘 Support

If you need help or have questions, please:

- Check our [FAQ](FAQ.md)
- File an issue on our [GitHub repository](https://github.com/yourusername/vscode-auto-reload-backend)
- Contact us at support@autoreloadbackend.com

## 🌟 Why Choose Auto Reload Backend?
- `Time-saving`: Eliminate manual reloads and focus on writing great code
- `Flexible`: Supports a wide range of web technologies and frameworks
- `User-friendly`: Easy to set up and use, with intuitive controls
- `Performance`: Optimized for speed, with minimal impact on your development environment
- `Active development`: Regular updates and new features based on user feedback

### Experience the power of seamless development with Auto Reload Backend! 🚀✨
