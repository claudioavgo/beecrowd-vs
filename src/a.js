// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "beecrownd-problems" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('beecrownd-problems.helloWorld', async () => {
		const url = 'https://exemplo.com'; // Substitua com o URL do site que você deseja acessar.
	
		try {
		  const response = await fetch(url);
		  vscode.window.showInformationMessage('Resposta da requisição GET: ' + response);
		} catch (error) {
		  vscode.window.showErrorMessage('Erro ao fazer a requisição GET: ' + error.message);
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
