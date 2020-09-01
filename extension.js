const vscode = require("vscode");

const parseString = (string, count) => {
  const trimString = string.trim();
  const arrayedString = trimString
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length !== 0);

  if (arrayedString.length === 1) {
    return `\n=> No duplicate`;
  } else {
    const aggregateStringObj = {};
    arrayedString.forEach(
      el => (aggregateStringObj[el] = aggregateStringObj[el] + 1 || 1)
    );

    let returnedString = Object.entries(aggregateStringObj)
      .filter(el => el[1] > 1)
      .map(el => (count ? `${el[0]}: ${el[1]}` : el[0]))
      .join("\n");

    if (returnedString.length === 0) return `\n=> No duplicate`;

    return `\n=> Duplicates:\n${returnedString}`;
  }
};

const insertText = (val, { count }) => {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage(
      "Can't find duplicate because no document is open"
    );
    return;
  }

  const selection = editor.selection;

  const returnedString = parseString(val, count);

  editor.edit(editBuilder => {
    editBuilder.insert(selection.end, returnedString);
  });
};

function activate(context) {
  const findDuplicateLines = vscode.commands.registerCommand(
    "extension.findDuplicateLines",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const selection = editor.selection;
      const text = editor.document.getText(selection);

      insertText(text, { count: false });
    }
  );
  context.subscriptions.push(findDuplicateLines);

  const countDuplicateLines = vscode.commands.registerCommand(
    "extension.countDuplicateLines",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const selection = editor.selection;
      const text = editor.document.getText(selection);

      insertText(text, { count: true });
    }
  );
  context.subscriptions.push(countDuplicateLines);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
