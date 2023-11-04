// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
let statusBarItem;
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "beecrownd-problems" is now active!');

	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
  	statusBarItem.text = '$(sparkle) BeeCrowd';
  	statusBarItem.command = 'beecrownd-problems.getProblem'; // Vincule o ícone ao seu comando

  	// Adicione o item de status à barra de status
  	statusBarItem.show();

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('beecrownd-problems.getProblem', async () => {
		
		const userInput = await vscode.window.showInputBox({
		  prompt: 'Digite o número da questão:'
		});
	
		if (!userInput) {
		  return;
		}
	
		const url = `https://www.beecrowd.com.br/repository/UOJ_${userInput}.html`;
	
		try {
		  const response = await fetch(url);
		  const content = await response.text();
		  
		  // Create a webview panel
		  const panel = vscode.window.createWebviewPanel(
			'beecrowdProblems', // Identificador único da webview
			`Beecrowd Problem ${userInput}`, // Título da webview
			vscode.ViewColumn.Two, // Exibir na segunda coluna (metade da janela)
			{}
		  );
	
		  panel.webview.html = content;
		} catch (error) {
		  vscode.window.showErrorMessage('Erro ao tentar carregar a página: ' + error.message);
		}
	  });

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {
	statusBarItem.dispose();
}


module.exports = {
	activate,
	deactivate
}
