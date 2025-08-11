package tokenizer

import "fmt"

// Definimos un tipo personalizado
type TokenType string

// Enumeramos valores permitidos
const (
	Keyword      TokenType = "keyword"
	Parenthesis  TokenType = "parenthesis"
	Space        TokenType = "space"
	Identifier   TokenType = "identifier"
	Number       TokenType = "number"
	Comma        TokenType = "comma"
	Bracket      TokenType = "bracket"
	Curly        TokenType = "curly"
	DoubleQuote  TokenType = "doublequote"
	Equal        TokenType = "equal"
	StringToken  TokenType = "string"
)

func CompilerTokenizer(line int, cursor int, content string, fileName string) (int, int, TokenType, string) {
	fmt.Printf("🔍 Tokenizing line[%d]: %s from file: %s\n", line, content, fileName)

	
	
	return 0, 0, "", ""
}