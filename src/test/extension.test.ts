import * as assert from 'assert';
import * as vscode from 'vscode';
import * as myExtension from '../extension';
import * as WebSocket from 'ws';

suite('Auto-Reload Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    const extensionId = 'yourPublisher.auto-reload'; // Replace with your actual extension ID

    test('Extension should be present', () => {
        assert.ok(vscode.extensions.getExtension(extensionId));
    });

    test('should activate', async function () {
        this.timeout(10000); // Increase timeout for activation
        const extension = vscode.extensions.getExtension(extensionId);
        await extension?.activate();
        assert.ok(true);
    });

    test('should register toggle command', async () => {
        const commands = await vscode.commands.getCommands(true);
        const toggleCommand = commands.find(c => c === 'extension.toggleAutoReload');
        assert.ok(toggleCommand);
    });

    test('should start and stop auto-reload', async function () {
        this.timeout(15000); // Increase timeout for this test

        // Start auto-reload
        await vscode.commands.executeCommand('extension.toggleAutoReload');
        
        // Check if WebSocket server is running
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for server to start
        const wsClient = new WebSocket('ws://localhost:8080');
        
        await new Promise((resolve, reject) => {
            wsClient.on('open', () => {
                assert.ok(true, 'WebSocket connection established');
                wsClient.close();
                resolve(true);
            });
            wsClient.on('error', (error) => {
                reject(new Error(`WebSocket connection failed: ${error.message}`));
            });
        });

        // Stop auto-reload
        await vscode.commands.executeCommand('extension.toggleAutoReload');
        
        // Check if WebSocket server is stopped
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for server to stop
        const wsClient2 = new WebSocket('ws://localhost:8080');
        
        await new Promise((resolve) => {
            wsClient2.on('error', () => {
                assert.ok(true, 'WebSocket server stopped');
                resolve(true);
            });
            wsClient2.on('open', () => {
                assert.fail('WebSocket server is still running');
            });
        });
    });

    // We'll remove the direct status bar item test and instead test the toggle functionality
    test('should toggle auto-reload state', async () => {
        // Ensure auto-reload is off at the start
        await vscode.commands.executeCommand('extension.toggleAutoReload');
        await vscode.commands.executeCommand('extension.toggleAutoReload');

        // Start auto-reload
        await vscode.commands.executeCommand('extension.toggleAutoReload');
        
        // Check if WebSocket server is running
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for server to start
        const wsClient = new WebSocket('ws://localhost:8080');
        
        await new Promise((resolve, reject) => {
            wsClient.on('open', () => {
                assert.ok(true, 'Auto-reload is active');
                wsClient.close();
                resolve(true);
            });
            wsClient.on('error', () => {
                reject(new Error('Auto-reload failed to start'));
            });
        });

        // Stop auto-reload
        await vscode.commands.executeCommand('extension.toggleAutoReload');
        
        // Check if WebSocket server is stopped
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for server to stop
        const wsClient2 = new WebSocket('ws://localhost:8080');
        
        await new Promise((resolve) => {
            wsClient2.on('error', () => {
                assert.ok(true, 'Auto-reload is inactive');
                resolve(true);
            });
            wsClient2.on('open', () => {
                assert.fail('Auto-reload failed to stop');
            });
        });
    });

    // Add more specific tests for your extension's functionality here
});