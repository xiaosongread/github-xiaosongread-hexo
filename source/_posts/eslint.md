---
title: eslint.md
categories: js-end
date: 2023-12-09 23:05:46
---

备注代码

<!-- more -->

```js
{
  "beautify.language": {
  "js": {
  "type": [
  "javascript",
  "json",
  "jsonc"
  ],
  "filename": [
  ".jshintrc",
  ".jsbeautifyrc"
  ]
  },
  "css": [
  "css",
  "less",
  "scss"
  ],
  "html": [
  "htm",
  "html",
  "vue"
  ]
  },
  "workbench.colorTheme": "Dracula At Night",
  "workbench.iconTheme": "vscode-icons",
  "vsicons.dontShowNewVersionMessage": true,
  "[vue]": {
  "editor.defaultFormatter": "octref.vetur",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
  },
  "[javascript]": {
  "editor.defaultFormatter": "octref.vetur",
  "editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
  }
  },
  "[html]": {
  "editor.defaultFormatter": "HookyQR.beautify"
  },
  "eslint.codeAction.showDocumentation": {
  "enable": true
  },
  "workbench.iconTheme": "material-icon-theme",
  "explorer.confirmDragAndDrop": false,
  "explorer.confirmDelete": false,
  //配置eslint
  "eslint.enable": true, // 启用保存时自动修复,默认只支持.js文件
  "eslint.validate": [
  "javascript",
  // 用eslint的规则检测js文件
  {
  "language": "vue", // 检测vue文件
  "autoFix": true // 为vue文件开启保存自动修复的功能
  },
  {
  "language": "html",
  "autoFix": true
  },
  ],
  "cSpell.enabledLanguageIds": [
  "asciidoc",
  "c",
  "cpp",
  "csharp",
  "css",
  "git-commit",
  "go",
  "graphql",
  "handlebars",
  "haskell",
  "html",
  "jade",
  "java",
  "javascript",
  "javascriptreact",
  "json",
  "jsonc",
  "jupyter",
  "latex",
  "less",
  "markdown",
  "php",
  "plaintext",
  "python",
  "pug",
  "restructuredtext",
  "rust",
  "scala",
  "scss",
  "text",
  "typescript",
  "typescriptreact",
  "yaml",
  "yml",
  "vue"
  ],
  "diffEditor.ignoreTrimWhitespace": false,
  "alias-skip.mappings": {
  "~@/": "/src",
  "views": "/src/views",
  "assets": "/src/assets",
  "network": "/src/network",
  "common": "/src/common"
  },
  "tabnine.experimentalAutoImports": true,
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",
  "bracketPairColorizer.depreciation-notice": false,
  "editor.tabSize": 2,
  "editor.detectIndentation": false,
  "cSpell.customDictionaries": {
  "custom-dictionary-user": {
  "name": "custom-dictionary-user",
  "path": "~/.cspell/custom-dictionary-user.txt",
  "addWords": true,
  "scope": "user"
  }
  },
  "editor.foldingStrategy": "indentation",
  "git.mergeEditor": false,
  "[css]": {
  "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
  "remote.SSH.remotePlatform": {
  "192.168.10.31": "linux"
  },
  "cSpell.languageSettings": [],
  "vetur.ignoreProjectWarning": true,
  "settingsSync.keybindingsPerPlatform": false,
  "eslint.migration.2_x": "off",
  "eslint.autoFixOnSave": true,
  "eslint.codeActionsOnSave.rules": null,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "never"
  },
  "editor.fontLigatures": null,
  "pathAlias.aliasMap": {
  "@": "${cwd}/src"
  },
  // 保存时格式化
  "editor.formatOnSave": true, //保存时格式化 
  // 让vue中的js按编辑器自带的ts格式进行格式化 
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  //vue的模板文件中的 html 使用自带的 js-beautify-html 进行格式化
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  // 让函数(名)和后面的括号之间加个空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": false,
  "vetur.format.defaultFormatterOptions": {
  // 让html的attributes不换行，看起来会更美观
  // "js-beautify-html": {
  // "wrap_line_length": 240,
  // "wrap_attributes": "auto",
  // "end_with_newline": false
  // },
  "prettier": {
  //设置分号
  "semi": true,
  //双引号变成单引号
  "singleQuote": true,
  //禁止随时添加逗号,这个很重要。找了好久
  "trailingComma": "none"
  }
  }, 
  "[javascript]": {
  "editor.formatOnSave": true
  },
  "[html]": {
  "editor.formatOnSave": false
  },
  "files.associations": {
  "*.cjson": "jsonc",
  "*.wxss": "css",
  "*.wxs": "javascript"
  },
  "emmet.includeLanguages": {
  "wxml": "html"
  },
  "minapp-vscode.disableAutoConfig": true,
  "Codegeex.Privacy": false,
  "files.autoSave": "off",
  "window.zoomLevel": 1,
  "editor.accessibilitySupport": "off",
  "git.confirmSync": false
  }

```
