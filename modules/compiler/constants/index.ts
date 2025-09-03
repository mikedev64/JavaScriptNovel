export const TEXT_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑü]+$/;
export const TEXT_REGEX_FULL = /[a-zA-ZáéíóúÁÉÍÓÚñÑü0-9]/;
export const NUMBER_REGEX = /^[0-9]+$/;
export const BOOLEAN_REGEX = /^(true|false)$/;

export const DOUBLE_QUOTE_REGEX = /^"([^"]*)"$/
export const SINGLE_QUOTE_REGEX = /^'([^']*)'$/
export const PARENTHESIS_REGEX = /^\((.+?)\)$/;
export const SPACE_REGEX = /^\s+$/;

export const KEYWORDS = [
        "scene",
        "background",
        "character",
        "dialogue",
        "variable",
        "audio",
        "video",
        "image",
        "volume",
        "play",
        "pause",
        "draw",
        "undraw"
]