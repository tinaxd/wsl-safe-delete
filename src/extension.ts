// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { spawn } from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// // Use the console to output diagnostic information (console.log) and errors (console.error)
	// // This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "wsl-safe-delete" is now active!');

	const moveToTrash = vscode.commands.registerCommand('wsl-safe-delete.moveToTrash', (args) => {
		// console.log(args);
		if (args === null) {
			return;
		}
		const path = args.path as string;
		const scheme = args.scheme as string;

		if (scheme !== 'file') {
			return;
		}

		if (path === null) {
			return;
		}

		vscode.window.showInformationMessage(`Are you sure you want to delete ${path}?`, ...["Yes", "No"])
		.then((answer) => {
			if (answer === 'Yes') {
				const trash = spawn('trash-put', [path]);
				trash.on('close', (code) => {
					console.log(`trash-put exited with code ${code}`);
					context.workspaceState.update('lastDeleted', path);
				});
			}
		});
	});

	// TODO: not implemented yet
	const restoreLast = vscode.commands.registerCommand('wsl-safe-delete.restoreLast', (args) => {
		if (true) {
			vscode.window.showInformationMessage('This feature is not implemented yet.');
		} else {
		const lastPath = context.workspaceState.get('lastDeleted');
		if (lastPath === undefined) {
			vscode.window.showInformationMessage('No files in trash.');
			return;
		}
		console.log(`last deleted file is ${lastPath}`);
		}
	});

	context.subscriptions.push(moveToTrash, restoreLast);
}

// this method is called when your extension is deactivated
export function deactivate() {}
