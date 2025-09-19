import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default [
	{
		files: ["**/*.{js,mjs,cjs,ts}"],
		ignores: ["eslint.config.js", "**/*.json"],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				project: [
					"./modules/*/tsconfig.json",
				]
			},
			globals: {
				console: "readonly",
				process: "readonly",
				Buffer: "readonly",
				__dirname: "readonly",
				__filename: "readonly",
				module: "readonly",
				require: "readonly",
				exports: "readonly",
				global: "readonly",
				// Electron globals
				electron: "readonly",
				ipcRenderer: "readonly",
				ipcMain: "readonly",
				webContents: "readonly",
				BrowserWindow: "readonly",
				app: "readonly"
			}
		},
		plugins: {
			"@typescript-eslint": tseslint,
			"prettier": prettier
		},
		rules: {
			"prettier/prettier": "error",
			"semi": ["error", "always"],
			"quotes": ["error", "double"],
			"indent": ["error", 8, { "SwitchCase": 1 }],
			"max-len": ["warn", { "code": 150, "tabWidth": 8 }],
			"comma-dangle": ["error", "always-multiline"],
			"no-trailing-spaces": "error",
			"eol-last": "error",
			"linebreak-style": "off",
			"no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1 }],
			"space-before-function-paren": ["error", "never"],
			"brace-style": ["error", "1tbs"],
			"comma-spacing": ["error", { "before": false, "after": true }],
			"key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
			"no-unused-vars": ["error", { 
				"args": "after-used", 
				"argsIgnorePattern": "^_",
				"varsIgnorePattern": "^_"
			}],
			"@typescript-eslint/no-unused-vars": ["error", { 
				"args": "after-used", 
				"argsIgnorePattern": "^_",
				"varsIgnorePattern": "^_"
			}],
			"no-console": "warn",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-var-requires": "error",
			"prefer-const": "error"
		}
	},
	{
		files: ["**/*.js"],
		rules: {
			"@typescript-eslint/no-var-requires": "off"
		}
	},
	{
		// Configuración específica para archivos de Electron
		files: ["**/electron/**/*.{js,ts}", "**/main.{js,ts}", "**/preload.{js,ts}"],
		languageOptions: {
			globals: {
				// Electron main process
				app: "readonly",
				BrowserWindow: "readonly",
				ipcMain: "readonly",
				dialog: "readonly",
				shell: "readonly",
				Menu: "readonly",
				MenuItem: "readonly",
				Notification: "readonly",
				// Node.js en main process
				__dirname: "readonly",
				__filename: "readonly",
				process: "readonly",
				Buffer: "readonly"
			}
		},
		rules: {
			"@typescript-eslint/no-var-requires": "off", // CommonJS en main process
			"no-console": "warn" // Permitir console en desarrollo
		}
	},
	{
		// Configuración para renderer process
		files: ["**/renderer/**/*.{js,ts}", "**/src/**/*.{js,ts}"],
		languageOptions: {
			globals: {
				// Browser globals
				window: "readonly",
				document: "readonly",
				navigator: "readonly",
				localStorage: "readonly",
				sessionStorage: "readonly",
				// Electron renderer
				ipcRenderer: "readonly",
				webFrame: "readonly"
			}
		}
	},
	{
		ignores: [
			"node_modules/",
			"**/node_modules/",
			"dist/",
			"**/dist/",
			"*.js.map",
			"**/*.js.map",
			"coverage/",
			"**/coverage/",
			"**/*.json",
			".obsidian/",
			".vscode/",
			"**/guides/*.js"
		]
	}
];