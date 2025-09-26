export const TEXT_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑü]$/;
export const TEXT_REGEX_FULL = /^[^"']+$/;
export const NUMBER_REGEX = /^[0-9\.]$/;
export const BOOLEAN_REGEX = /^(true|false)$/;

export const DOUBLE_QUOTE_REGEX = /^"$/;
export const SINGLE_QUOTE_REGEX = /^'$/;
export const PARENTHESIS_REGEX = /^[\(\)]$/;
export const BRACKET_REGEX = /^[\[\]]$/;
export const KEYS_REGEX = /^[\{\}]$/;
export const SPACE_REGEX = /^\s+$/;
export const OPERATOR_REGEX = /^[\+\-\*\/\=]$/;
export const COMMA_REGEX = /^,$/;
export const DOT_REGEX = /^\.$/;
export const SEMICOLON_REGEX = /^;$/;
export const COLON_REGEX = /^:$/;

export const KEYWORDS = [
        "scene",
        "background",
        "character",
        "dialogue",
        "variable",
        "audio",
        "video",
        "image",
        "jump",
        "volume",
        "play",
        "pause",
        "draw",
        "undraw",
        "loop",
        "fade",
        "start",
        "stop",
];
