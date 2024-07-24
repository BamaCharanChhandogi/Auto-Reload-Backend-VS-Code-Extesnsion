# ReloadMagic

This project provides an automatic browser reload mechanism whenever you make changes to your files in VS Code. It consists of a VS Code extension that detects file changes and a browser extension (or client-side script) that reloads the page when you switch back to the browser tab.

## Features
- Automatically reloads the browser when file changes are detected in VS Code.
- Uses WebSocket communication between VS Code and the browser.
- Works with JavaScript, HTML, and CSS files.

## Components

### 1. VS Code Extension
The VS Code extension is responsible for detecting file changes and sending a WebSocket message to the browser.

#### Setup Instructions
1. **Install Dependencies**: Ensure you have Node.js installed. Install Yeoman and the VS Code Extension Generator.
2. **Generate the Extension**: Use the generator to scaffold a new VS Code extension.
3. **Implement File Watching**: Add file watchers to detect changes in your project files.
4. **Setup WebSocket Server**: Implement a WebSocket server to communicate with the browser.

### 2. Browser Extension
The browser extension listens for WebSocket messages and reloads the page when it receives a reload message.

#### Setup Instructions
1. **Create Manifest File**: Define the extension's properties and permissions.
2. **Implement Background Script**: Manage WebSocket connections and handle reload messages.
3. **Load Extension in Browser**: Load the extension into your browser for development and testing.

### 3. Client-Side Script (Alternative)
As an alternative to the browser extension, you can include a script in your web pages that connects to the WebSocket server and reloads the page when instructed.

## Usage

1. **Start Your Server**: Run your Node.js server.
2. **Start WebSocket Server**: Ensure the WebSocket server from your VS Code extension is running.
3. **Load Browser Extension or Include Script**: Load the browser extension or include the client-side script in your web pages.
4. **Make Changes**: Edit your files in VS Code and switch to the browser to see the page automatically reload.

## Troubleshooting

- **WebSocket Connection**: Ensure the WebSocket server is running and accessible.
- **Browser Console Errors**: Check the browser console for any WebSocket connection errors.
- **File Watcher Setup**: Verify that the VS Code extension correctly watches your project files.

## Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

## License

This project is licensed under the MIT License.
