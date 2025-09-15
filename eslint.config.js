import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default [
	js.configs.recommended,
	{
		files: ["**/*.{js,mjs,cjs,ts}"],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				project: [
					"./modules/*/tsconfig.json",
					"./tsconfig.json"
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
			"indent": ["error", "tab", { "SwitchCase": 1 }],
			"max-len": ["warn", { "code": 100, "tabWidth": 8 }],
			"comma-dangle": ["error", "always-multiline"],
			"no-trailing-spaces": "error",
			"eol-last": "error",
			"no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1 }],
			"space-before-function-paren": ["error", "never"],
			"brace-style": ["error", "1tbs"],
			"comma-spacing": ["error", { "before": false, "after": true }],
			"key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
			"no-console": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-var-requires": "error",
			"@typescript-eslint/prefer-const": "error"
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
			"**/coverage/"
		]
	}
];