import * as assert from 'assert';
import * as vscode from 'vscode';
import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Extension should be present', () => {
        assert.ok(vscode.extensions.getExtension('yourPublisher.yourExtensionName'));
    });

    test('should activate', function () {
        this.timeout(1500);
        return vscode.extensions.getExtension('yourPublisher.yourExtensionName')?.activate().then(() => {
            assert.ok(true);
        });
    });

    test('should register command', () => {
        return vscode.commands.getCommands(true).then((commands) => {
            const myCommand = commands.find(c => c === 'extension.startAutoReload');
            assert.ok(myCommand);
        });
    });

    // More specific tests for your extension's functionality
});