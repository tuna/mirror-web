// Pre-generated word translations
type Dict = Record<string, string>;

import DICT_RAW from "./dict.json";
const DICT: Dict = DICT_RAW;

// Normalize dictionary keys to lowercase for case-insensitive matching
const normalizedDict: Dict = {};
for (const [k, v] of Object.entries(DICT)) {
  normalizedDict[k.toLowerCase()] = v;
}

type UndoMap = WeakMap<Node, string[]>;
const undo: UndoMap = new WeakMap();

// Tokenized (without spaces)
type WordToken = {
  type: "en",
  word: string,
} | {
  type: "zh",
  word: string,
};

type PuncToken = {
  type: "en-punc",
  punc: string,
} | {
  type: "zh-punc",
  punc: string,
};

type Token = WordToken | PuncToken;

// Match the longest prefix of `text` in dictionary, translate it, and return the rest of the text
// empty string = no match or no remaining text
function matchLongest(dict: Dict, word: string): [string, string] {
  for (let len = word.length; len >= 1; len--) {
    const prefix = word.slice(0, len);
    const key = prefix.toLowerCase();
    if (key in dict) {
      return [dict[key], word.slice(len)];
    }
  }
  return ["", word];
}

// Map punctuations
// Maps English punctuations to Chinese punctuations, and vice-versa
// These mappings are not included in the dictionary
function translatePunc(punc: PuncToken): PuncToken {
  const enToZh: Record<string, string> = {
    ",": "\uFF0C",
    ".": "\u3002",
    ";": "\uFF1B",
    ":": "\uFF1A",
    "!": "\uFF01",
    "?": "\uFF1F",
    "(": "\uFF08",
    ")": "\uFF09",
    "[": "\u3010",
    "]": "\u3011",
    "{":  "\uFF5B",
    "}": "\uFF5D",
    "<": "\u300A",
    ">": "\u300B",
    "/": "\uFF0F",
    "\\": "\uFF3C",
    "~": "\uFF5E",
    "'": "\u2018",
    "\"": "\u201C",
    "-": "\u2014",
    "_": "\u2014",
    "&": "\uFF06",
    "@": "\uFF20",
    "#": "\uFF03",
    "%": "\uFF05",
    "^": "\u2026",
    "*": "\uFF0A",
    "+": "\uFF0B",
    "=": "\uFF1D",
    "|": "\uFF5C",
    "`": "\u2018",
  };
  const zhToEn: Record<string, string> = {};
  for (const [k, v] of Object.entries(enToZh)) {
    zhToEn[v] = k;
  }
  // Fix collision: both "-" and "_" map to "\u2014", ensure reverse maps back to "-"
  zhToEn["\u2014"] = "-";
  if (punc.type === "en-punc") {
    const mapped = enToZh[punc.punc];
    return mapped ? { type: "zh-punc", punc: mapped } : punc;
  } else {
    const mapped = zhToEn[punc.punc];
    return mapped ? { type: "en-punc", punc: mapped } : punc;
  }
}

function translate(dict: Dict, text: string): string {

  // 1. Tokenize
  // Tokenizer works in a greedy way, matches the same type of character greedily until it hits
  // a different type of character, or a space, or the end of the text.
  // Punctuations only generates one character per token (so ".;" will generates two tokens)
  // Spaces won't generate any tokens
  const enPunc = /[!-\/:-@\[-`{-~]/;
  const zhPunc = /[\u2014\u2018\u201C\u2026\u3000-\u303F\uFF00-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65]/;
  const isEn = (ch: string) => /[a-zA-Z0-9]/.test(ch);
  const isZh = (ch: string) => !isEn(ch) && !enPunc.test(ch) && !zhPunc.test(ch) && ch !== " ";

  const tokens: Token[] = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === " ") {
      i++;
    } else if (enPunc.test(ch)) {
      tokens.push({ type: "en-punc", punc: ch });
      i++;
    } else if (zhPunc.test(ch)) {
      tokens.push({ type: "zh-punc", punc: ch });
      i++;
    } else if (isEn(ch)) {
      let word = "";
      while (i < text.length && isEn(text[i])) {
        word += text[i];
        i++;
      }
      tokens.push({ type: "en", word });
    } else {
      let word = "";
      while (i < text.length && isZh(text[i])) {
        word += text[i];
        i++;
      }
      tokens.push({ type: "zh", word });
    }
  }

  // 2. Translate
  // Use matchLongest repeatedly to translate the entire word. Do this even for English words (so it can split words in half).
  const translated: Token[] = [];
  for (const tok of tokens) {
    if (tok.type === "en-punc" || tok.type === "zh-punc") {
      translated.push(translatePunc(tok));
    } else {
      let remaining = tok.word;
      while (remaining.length > 0) {
        const [result, rest] = matchLongest(dict, remaining);
        if (result === "") {
          // No match at current position: progressively remove prefix to find a match
          let found = false;
          for (let skip = 1; skip < remaining.length; skip++) {
            const [subResult] = matchLongest(dict, remaining.slice(skip));
            if (subResult !== "") {
              // Push the unmatched prefix as-is, then continue translating from the match
              // Except the case that skip == 1, this means that we're most likely hit with a single suffix (e.g. s).
              if (skip > 1)
                translated.push({ type: tok.type, word: remaining.slice(0, skip) });

              remaining = remaining.slice(skip);
              found = true;
              break;
            }
          }
          if (!found) {
            // No match anywhere: emit entire remaining as-is
            translated.push({ type: tok.type, word: remaining });
            break;
          }
        } else {
          // Determine if the translated result is en or zh
          const firstChar = result[0];
          if (firstChar && isEn(firstChar)) {
            translated.push({ type: "en", word: result });
          } else {
            translated.push({ type: "zh", word: result });
          }
          remaining = rest;
        }
      }
    }
  }

  // 3. Join
  // The space insertion rule is that:
  // Include space in the following cases only:
  // - English word -> Chinese word
  // - English word -> English word
  // - English punctuation (only "," and "." and ";") -> English word
  // - English punctuation (all) -> Chinese word
  // - Chinese word -> English word
  let output = "";
  for (let j = 0; j < translated.length; j++) {
    const tok = translated[j];
    const prev = j > 0 ? translated[j - 1] : null;
    if (prev) {
      const prevType = prev.type;
      const curType = tok.type;
      let needSpace = false;
      // English word -> Chinese word
      if (prevType === "en" && curType === "zh") needSpace = true;
      // English word -> English word
      if (prevType === "en" && curType === "en") needSpace = true;
      // English punctuation (only "," "." ";") -> English word
      if (prevType === "en-punc" && curType === "en" && 
          (prev as PuncToken).punc in { ",": 1, ".": 1, ";": 1 }) needSpace = true;
      // English punctuation (all) -> Chinese word
      if (prevType === "en-punc" && curType === "zh") needSpace = true;
      // Chinese word -> English word
      if (prevType === "zh" && curType === "en") needSpace = true;
      if (needSpace) output += " ";
    }
    output += tok.type === "en-punc" || tok.type === "zh-punc"
      ? (tok as PuncToken).punc
      : (() => {
          const word = (tok as WordToken).word;
          if (tok.type !== "en") return word;
          // Capitalize if: start of text, after zh/zh-punc, or after "."
          const shouldCap = j === 0
            || (prev != null && prev.type === "zh-punc")
            || (prev != null && prev.type === "en-punc" && [".", ";"].includes((prev as PuncToken).punc));
          return shouldCap ? word.charAt(0).toUpperCase() + word.slice(1) : word;
        })();
  }
  return output;
}

function textWalker(): TreeWalker {
  // Create TreeWalker
  return document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        // Reject whitespace-only nodes to save translation cycles
        if (!node.nodeValue.trim())
          return NodeFilter.FILTER_REJECT;

        // Reject text nodes inside <script>, <style>, or <noscript>
        const parentTag = node.parentNode.nodeName;
        if (parentTag === 'SCRIPT' || parentTag === 'STYLE' || parentTag === 'NOSCRIPT')
          return NodeFilter.FILTER_REJECT;

        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );
}

function translatePage() {
  const walker = textWalker();

  let node: Node;
  while (node = walker.nextNode()) {
    // Preserve whitespaces at front and back
    const orig = node.nodeValue;
    const frontWhitespace = orig.match(/^\s*/)[0];
    const backWhitespace = orig.match(/\s*$/)[0];
    const trimmedText = orig.trim();
    const translated = frontWhitespace + translate(normalizedDict, trimmedText) + backWhitespace; 
    node.nodeValue = translated;

    const curStack = undo.get(node) || [];
    curStack.push(orig);
    undo.set(node, curStack);
  }

  document.querySelector(".untranslate-fab")?.classList.add("shown");
}

function undoTranslatePage() {
  const walker = textWalker();
  let hasUndo = false;
  
  let node: Node;
  while (node = walker.nextNode()) {
    const cur = undo.get(node);
    if (cur && cur.length > 0) {
      const prev = cur.pop();
      node.nodeValue = prev;

      if (cur.length === 0)
        undo.delete(node);
      else
        hasUndo = true;
    }
  }

  if (!hasUndo) {
    document.querySelector(".untranslate-fab")?.classList.remove("shown");
  }
}

export function translateSetup() {
  const translateIcon = document.querySelector(".translate-fab");
  if (translateIcon) {
    console.log('[MEOW] Translator registered')
    translateIcon.addEventListener("mousedown", function() {
      this.classList.add("mousedown");
    });
    translateIcon.addEventListener("mouseup", function() {
      this.classList.remove("mousedown");
    });
    translateIcon.addEventListener("click", function() {
      translatePage();
    });

    document.addEventListener('keydown', (event) => {
      console.log(event);
      // 1. Determine the currently focused element
      const activeEl = document.activeElement;

      // 2. Check if the user is interacting with an input field or editable area
      const isTyping = activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.tagName === 'SELECT'
      );

      // If typing inside an input, immediately return and do nothing
      if (isTyping) {
        return;
      }

      // 3. Check for the Shift + T shortcut
      // event.code === 'KeyT' checks the physical key, while event.shiftKey ensures Shift is held
      if (event.shiftKey && event.code === 'KeyT') {
        console.log('Shortcut triggered: Shift + T');
        translatePage();
      }
    });
  } else {
    console.warn('[MEOW] Translator failed to register: translate icon not found');
  }

  const note = document.querySelector(".translate-note");
  if (note)
    note.addEventListener('click', () => {
      note.classList.add('dismissed');
    });

  const untranslateFab = document.querySelector(".untranslate-fab");
  if (untranslateFab) {
    untranslateFab.addEventListener("click", function() {
      undoTranslatePage();
    });
  }
}