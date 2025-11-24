/*! JSFuck 0.5.0 - http://jsfuck.com - Converted to TypeScript */

const MIN = 32;
const MAX = 126;

const SIMPLE: Record<string, string> = {
  'false': '![]',
  'true': '!![]',
  'undefined': '[][[]]',
  'NaN': '+[![]]',
  'Infinity': '+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]]+[+[]])'
};

const CONSTRUCTORS: Record<string, string> = {
  'Array': '[]',
  'Number': '(+[])',
  'String': '([]+[])',
  'Boolean': '(![])',
  'Function': '[]["at"]',
  'RegExp': 'Function("return/"+false+"/")()'
};

const MAPPING: Record<string, string | null> = {
  'a': '(false+"")[1]',
  'b': '([]["entries"]()+"")[2]',
  'c': '([]["at"]+"")[3]',
  'd': '(undefined+"")[2]',
  'e': '(true+"")[3]',
  'f': '(false+"")[0]',
  'g': '(false+[0]+String)[20]',
  'h': '(+(101))["to"+String["name"]](21)[1]',
  'i': '([false]+undefined)[10]',
  'j': '([]["entries"]()+"")[3]',
  'k': '(+(20))["to"+String["name"]](21)',
  'l': '(false+"")[2]',
  'm': '(Number+"")[11]',
  'n': '(undefined+"")[1]',
  'o': '(true+[]["at"])[10]',
  'p': '(+(211))["to"+String["name"]](31)[1]',
  'q': '("")["fontcolor"]([0]+false+")[20]',
  'r': '(true+"")[1]',
  's': '(false+"")[3]',
  't': '(true+"")[0]',
  'u': '(undefined+"")[0]',
  'v': '(+(31))["to"+String["name"]](32)',
  'w': '(+(32))["to"+String["name"]](33)',
  'x': '(+(101))["to"+String["name"]](34)[1]',
  'y': '(NaN+[Infinity])[10]',
  'z': '(+(35))["to"+String["name"]](36)',

  'A': '(NaN+[]["entries"]())[11]',
  'B': '(+[]+Boolean)[10]',
  'C': 'Function("return escape")()(("")["italics"]())[2]',
  'D': 'Function("return escape")()([]["at"])["at"]("-1")',
  'E': '(RegExp+"")[12]',
  'F': '(+[]+Function)[10]',
  'G': '(false+Function("return Date")()())[30]',
  'H': null,
  'I': '(Infinity+"")[0]',
  'J': null,
  'K': null,
  'L': null,
  'M': '(true+Function("return Date")()())[30]',
  'N': '(NaN+"")[0]',
  'O': null,
  'P': null,
  'Q': null,
  'R': '(+[]+RegExp)[10]',
  'S': '(+[]+String)[10]',
  'T': '(NaN+Function("return Date")()())[30]',
  'U': null,
  'V': null,
  'W': null,
  'X': null,
  'Y': null,
  'Z': null,

  ' ': '(NaN+[]["at"])[11]',
  '!': null,
  '"': '("")["fontcolor"]()[12]',
  '#': null,
  '$': null,
  '%': 'Function("return escape")()([]["at"])[22]',
  '&': '("")["fontcolor"](")[13]',
  "'": null,
  '(': '([]["at"]+"")[11]',
  ')': '(""+[]["at"])[12]',
  '*': null,
  '+': '(+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]])+[])[2]',
  ',': '[[]]["concat"]([[]])+""',
  '-': '(+(.+[0000001])+"")[2]',
  '.': '(+(+!+[]+[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+[!+[]+!+[]]+[+[]])+[])[+!+[]]',
  '/': '(false+[0])["italics"]()[10]',
  ':': '(RegExp()+"")[3]',
  ';': '("")["fontcolor"](NaN+")[21]',
  '<': '("")["italics"]()[0]',
  '=': '("")["fontcolor"]()[11]',
  '>': '("")["italics"]()[2]',
  '?': '(RegExp()+"")[2]',
  '@': null,
  '[': '([]["entries"]()+"")[0]',
  '\\': '(RegExp("/")+"")[1]',
  ']': '([]["entries"]()+"")[22]',
  '^': null,
  '_': null,
  '`': null,
  '{': '([0]+false+[]["at"])[20]',
  '|': null,
  '}': '([]["at"]+"")["at"]("-1")',
  '~': null
};

const GLOBAL = 'Function("return this")()';

function fillMissingDigits() {
  for (let number = 0; number < 10; number++) {
    let output = "+[]";

    if (number > 0) { output = "+!" + output; }
    for (let i = 1; i < number; i++) { output = "+!+[]" + output; }
    if (number > 1) { output = output.substring(1); }

    MAPPING[number.toString()] = "[" + output + "]";
  }
}

function replaceMap() {
  function digitReplacer(_: string, x: string): string {
    return MAPPING[x] || '';
  }

  function numberReplacer(_: string, y: string): string {
    const values = y.split("");
    const head = +(values.shift() || 0);
    let output = "+[]";

    if (head > 0) { output = "+!" + output; }
    for (let i = 1; i < head; i++) { output = "+!+[]" + output; }
    if (head > 1) { output = output.substring(1); }

    return [output].concat(values).join("+").replace(/(\d)/g, digitReplacer);
  }

  for (let i = MIN; i <= MAX; i++) {
    const character = String.fromCharCode(i);
    let value = MAPPING[character];
    if (!value) { continue; }

    for (const key in CONSTRUCTORS) {
      value = value.replace(new RegExp("\\b" + key, "gi"), CONSTRUCTORS[key] + '["constructor"]');
    }

    for (const key in SIMPLE) {
      value = value.replace(new RegExp(key, "gi"), SIMPLE[key]);
    }

    value = value.replace(/(\d\d+)/g, numberReplacer);
    value = value.replace(/\((\d)\)/g, digitReplacer);
    value = value.replace(/\[(\d)\]/g, digitReplacer);

    value = value.replace(/GLOBAL/g, GLOBAL);
    value = value.replace(/\+""/g, "+[]");
    value = value.replace(/""/g, "[]+[]");

    MAPPING[character] = value;
  }
}

function replaceStrings() {
  const regEx = /[^\[\]\(\)\!\+]{1}/g;
  let count = MAX - MIN;
  let missing: Record<string, string> = {};

  function findMissing(): boolean {
    missing = {};
    let done = false;

    for (const all in MAPPING) {
      const value = MAPPING[all];
      if (value && value.match(regEx)) {
        missing[all] = value;
        done = true;
      }
    }

    return done;
  }

  function mappingReplacer(_: string, b: string): string {
    return b.split("").join("+");
  }

  function valueReplacer(c: string): string {
    return missing[c] ? c : (MAPPING[c] || '');
  }

  for (const all in MAPPING) {
    if (MAPPING[all]) {
      MAPPING[all] = MAPPING[all]!.replace(/"([^"]+)"/gi, mappingReplacer);
    }
  }

  while (findMissing()) {
    for (const all in missing) {
      let value = MAPPING[all] || '';
      value = value.replace(regEx, valueReplacer);

      MAPPING[all] = value;
      missing[all] = value;
    }

    if (count-- === 0) {
      console.error("Could not compile the following chars:", missing);
      break;
    }
  }
}

function escapeSequence(c: string): string {
  const cc = c.charCodeAt(0);
  if (cc < 256) {
    return '\\' + cc.toString(8);
  } else {
    const cc16 = cc.toString(16);
    return '\\u' + ('0000' + cc16).substring(cc16.length);
  }
}

function escapeSequenceForReplace(c: string): string {
  return escapeSequence(c).replace('\\', 't');
}

export function encode(input: string, wrapWithEval: boolean = true, runInParentScope: boolean = false): string {
  if (!input) {
    return "";
  }

  let unmapped = '';
  for (const k in MAPPING) {
    if (MAPPING[k]) {
      unmapped += k;
    }
  }
  unmapped = unmapped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const unmappedRegex = new RegExp('[^' + unmapped + ']', 'g');
  const unmappedCharactersCount = (input.match(unmappedRegex) || []).length;

  if (unmappedCharactersCount > 1) {
    input = input.replace(/[^0123456789.adefilnrsuN]/g, escapeSequenceForReplace);
  } else if (unmappedCharactersCount > 0) {
    input = input.replace(/["\\]/g, escapeSequence);
    input = input.replace(unmappedRegex, escapeSequence);
  }

  let r = "";
  for (const i in SIMPLE) {
    r += i + "|";
  }
  r += ".";

  const output: string[] = [];
  input.replace(new RegExp(r, 'g'), function (c) {
    const replacement = SIMPLE[c];
    if (replacement) {
      output.push("(" + replacement + "+[])");
    } else {
      const mappingReplacement = MAPPING[c];
      if (mappingReplacement) {
        output.push(mappingReplacement);
      } else {
        throw new Error('Found unmapped character: ' + c);
      }
    }
    return c;
  });

  let result = output.join("+");

  if (/^\d$/.test(input)) {
    result += "+[]";
  }

  if (unmappedCharactersCount > 1) {
    result = "(" + result + ")[" + encode("split", false) + "](" + encode("t", false) + ")[" + encode("join", false) + "](" + encode("\\", false) + ")";
  }

  if (unmappedCharactersCount > 0) {
    result = "[][" + encode("at", false) + "]" +
      "[" + encode("constructor", false) + "]" +
      "(" + encode("return\"", false) + "+" + result + "+" + encode("\"", false) + ")()";
  }

  if (wrapWithEval) {
    if (runInParentScope) {
      result = "[][" + encode("at", false) + "]" +
        "[" + encode("constructor", false) + "]" +
        "(" + encode("return eval", false) + ")()" +
        "(" + result + ")";
    } else {
      result = "[][" + encode("at", false) + "]" +
        "[" + encode("constructor", false) + "]" +
        "(" + result + ")()";
    }
  }

  return result;
}

// Initialize
fillMissingDigits();
replaceMap();
replaceStrings();
