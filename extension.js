const vscode = require("vscode");

const parseString = (string, count, all, unique) => {
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

    let returnedString = "";

    if (all) {
      returnedString = Object.entries(aggregateStringObj)
        .map(el => (count ? `${el[0]}: ${el[1]}` : el[0]))
        .join("\n");
    }
    if (!all) {
      if (unique) {
        returnedString = Object.entries(aggregateStringObj)
          .filter(el => el[1] === 1)
          .map(el => (count ? `${el[0]}: ${el[1]}` : el[0]))
          .join("\n");
      }
      if (!unique) {
        returnedString = Object.entries(aggregateStringObj)
          .filter(el => el[1] > 1)
          .map(el => (count ? `${el[0]}: ${el[1]}` : el[0]))
          .join("\n");
      }
    }

    if (returnedString.length === 0) return `\n=> No duplicate`;

    return `\n=> Duplicates:\n${returnedString}`;
  }
};

const insertText = (val, { count, all, unique }) => {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage(
      "Can't find duplicate because no document is open"
    );
    return;
  }

  const selection = editor.selection;

  const returnedString = parseString(val, count, all, unique);

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

      insertText(text, { count: false, all: false, unique: true });
    }
  );
  context.subscriptions.push(findDuplicateLines);

  const findUniqueLines = vscode.commands.registerCommand(
    "extension.findUniqueLines",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const selection = editor.selection;
      const text = editor.document.getText(selection);

      insertText(text, { count: false, all: false, unique: true });
    }
  );
  context.subscriptions.push(findUniqueLines);

  const countDuplicateLines = vscode.commands.registerCommand(
    "extension.countDuplicateLines",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const selection = editor.selection;
      const text = editor.document.getText(selection);

      insertText(text, { count: true, all: false, unique: false });
    }
  );
  context.subscriptions.push(countDuplicateLines);

  const countAllLines = vscode.commands.registerCommand(
    "extension.countAllLines",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const selection = editor.selection;
      const text = editor.document.getText(selection);

      insertText(text, { count: true, all: true, unique: false });
    }
  );
  context.subscriptions.push(countAllLines);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
