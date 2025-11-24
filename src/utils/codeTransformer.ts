/**
 * JS ReverseLab - Code Transformer
 * © 2025 Murr | https://github.com/vtstv
 */

export interface PackerResult {
  encoded: string;
  dictionary: string[];
}

export class CodeTransformer {
  private static evalHolder = window.eval;

  static decode(evalJsCode: string): string {
    const cleanCode = evalJsCode.replace(/^eval/, '');
    
    try {
      window.eval = function(code: string): any {
        return code;
      };
      
      const result = CodeTransformer.evalHolder.call(window, cleanCode);
      
      window.eval = CodeTransformer.evalHolder;
      
      // If result is a function, try to execute it to get the actual code
      if (typeof result === 'function') {
        try {
          const executed = result();
          return typeof executed === 'string' ? executed : String(executed);
        } catch (e) {
          return result.toString();
        }
      }
      
      return typeof result === 'string' ? result : String(result);
    } catch (error) {
      window.eval = CodeTransformer.evalHolder;
      throw new Error(`Decoding failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static encode(sourceCode: string, base62: boolean = true, useCustomVars: boolean = false): string {
    if (!base62) {
      return this.simpleCompress(sourceCode);
    }

    // Remove strings temporarily to avoid encoding their content
    const strings: string[] = [];
    let codeWithoutStrings = sourceCode.replace(/(['"])(?:\\.|(?!\1)[^\\])*\1/g, (match) => {
      strings.push(match);
      return `___STRING_${strings.length - 1}___`;
    });

    // Extract all identifiers and count their occurrences
    const wordPattern = /\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/g;
    const wordCounts = new Map<string, number>();
    
    let match;
    while ((match = wordPattern.exec(codeWithoutStrings)) !== null) {
      const word = match[0];
      if (!word.startsWith('___STRING_')) {
        wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
      }
    }

    // Sort by frequency and create dictionary
    const sortedWords = Array.from(wordCounts.entries())
      .filter(([word, count]) => count > 1 || word.length > 2)
      .sort((a, b) => b[1] - a[1])
      .map(([word]) => word);

    // Build keyword dictionary
    const keywords: string[] = [];
    let compressed = codeWithoutStrings;
    
    sortedWords.forEach((word) => {
      const index = keywords.length;
      const placeholder = this.toBase62(index);
      const regex = new RegExp(`\\b${this.escapeRegex(word)}\\b`, 'g');
      
      // Only replace if it saves space
      const originalLength = word.length * (wordCounts.get(word) || 0);
      const replacedLength = placeholder.length * (wordCounts.get(word) || 0) + word.length;
      
      if (originalLength > replacedLength) {
        compressed = compressed.replace(regex, placeholder);
        keywords.push(word);
      }
    });

    // Restore strings
    compressed = compressed.replace(/___STRING_(\d+)___/g, (_, index) => strings[parseInt(index)]);

    // If no keywords to replace, return original code
    if (keywords.length === 0) {
      return sourceCode;
    }

    return this.wrapInPacker(compressed, keywords, useCustomVars);
  }

  private static toBase62(num: number): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (num < 62) return chars[num];
    
    let result = '';
    while (num > 0) {
      result = chars[num % 62] + result;
      num = Math.floor(num / 62);
    }
    return result;
  }

  private static escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private static wrapInPacker(compressed: string, dictionary: string[], useCustomVars: boolean = false): string {
    // Escape for JavaScript string literal inside eval
    const escapedCode = compressed
      .replace(/\\/g, '\\\\\\\\')
      .replace(/'/g, "\\\\'")
      .replace(/"/g, '\\\\"')
      .replace(/\n/g, '\\\\n')
      .replace(/\r/g, '\\\\r')
      .replace(/\t/g, '\\\\t');

    const dictString = dictionary.join('|');
    const radix = 62;
    const count = dictionary.length;

    if (useCustomVars) {
      return `eval(function(m,u,r,r,_,__){_=function(n){return(n<62?'':_(parseInt(n/62)))+((n=n%62)>35?String.fromCharCode(n+29):n.toString(36))};if(!''.replace(/^/,String)){while(r--)__[_(r)]=r[r]||_(r);r=[function(_){return __[_]}];_=function(){return'\\\\w+'};r=1};while(r--)if(r[r])m=m.replace(new RegExp('\\\\b'+_(r)+'\\\\b','g'),r[r]);return m}('${escapedCode}',${radix},${count},'${dictString}'.split('|'),0,{}))`;
    }

    return `eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c]);return p}('${escapedCode}',${radix},${count},'${dictString}'.split('|'),0,{}))`;
  }

  private static simpleCompress(code: string): string {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  static beautify(code: string): string {
    let result = code;
    let indent = 0;
    const indentStr = '  ';
    let formatted = '';
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < result.length; i++) {
      const char = result[i];
      const prevChar = result[i - 1];

      if ((char === '"' || char === "'") && prevChar !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
        }
      }

      if (!inString) {
        if (char === '{' || char === '[') {
          formatted += char + '\n' + indentStr.repeat(++indent);
          continue;
        }
        if (char === '}' || char === ']') {
          formatted += '\n' + indentStr.repeat(--indent) + char;
          continue;
        }
        if (char === ';') {
          formatted += char + '\n' + indentStr.repeat(indent);
          continue;
        }
      }

      formatted += char;
    }

    return formatted.trim();
  }

  static minify(code: string): string {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}();,:<>!=+\-*\/&|?])\s*/g, '$1')
      .trim();
  }

  static detectEvalLayers(code: string): number {
    let layers = 0;
    let current = code;
    
    while (current.includes('eval(')) {
      layers++;
      if (layers > 10) break;
      current = current.substring(current.indexOf('eval(') + 5);
    }
    
    return layers;
  }

  static autoDecodeAll(evalJsCode: string, maxLayers: number = 10): string {
    let result = evalJsCode;
    let iterations = 0;
    
    while (result.includes('eval(') && iterations < maxLayers) {
      try {
        const evalMatch = result.match(/eval\s*\([\s\S]*\);?/);
        if (evalMatch) {
          result = this.decode(evalMatch[0]);
        } else {
          result = this.decode(result);
        }
        iterations++;
      } catch (error) {
        break;
      }
    }
    
    return result;
  }

  static highlightSyntax(code: string): string {
    return code
      .replace(/(\b(?:function|const|let|var|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|this|typeof|instanceof|delete|void|async|await|class|extends|import|export|from|default|yield)\b)/g, '<span class="keyword">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
      .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, '<span class="string">$1</span>')
      .replace(/(\b\d+\.?\d*\b)/g, '<span class="number">$1</span>');
  }

  static renameVariables(code: string): string {
    const varMap = new Map<string, string>();
    let counter = 0;
    
    const generateName = (index: number): string => {
      const names = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta'];
      return names[index % names.length] + (index >= names.length ? Math.floor(index / names.length) : '');
    };

    return code.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, (match) => {
      if (/^(function|const|let|var|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|this|typeof|instanceof|delete|void|async|await|class|extends|import|export|from|default|yield|console|log|window|document|Math|String|Number|Boolean|Array|Object|Date|Error|RegExp|eval)$/.test(match)) {
        return match;
      }
      
      if (!varMap.has(match)) {
        varMap.set(match, generateName(counter++));
      }
      return varMap.get(match)!;
    });
  }

  static decodeStrings(code: string): string {
    return code
      .replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/\\u([0-9A-Fa-f]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/\\u\{([0-9A-Fa-f]+)\}/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));
  }

  static customPacker(code: string, template: string): string {
    // Extract all identifiers
    const wordPattern = /\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/g;
    const tokens = code.match(wordPattern) || [];
    const dictionary = tokens.filter((token, index, self) => 
      self.indexOf(token) === index && token.length > 1
    );
    
    let compressed = code;
    dictionary.forEach((token, index) => {
      const regex = new RegExp(`\\b${this.escapeRegex(token)}\\b`, 'g');
      compressed = compressed.replace(regex, this.toBase62(index));
    });

    const escapedCode = compressed
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r');

    const dictString = dictionary.join('|');
    const base = 62;

    return template
      .replace(/\{CODE\}/g, escapedCode)
      .replace(/\{BASE\}/g, base.toString())
      .replace(/\{DICT\}/g, dictString);
  }

  // ========== DEOBFUSCATION METHODS ==========

  /**
   * Decode JSFuck obfuscated code
   * JSFuck uses only 6 characters: []()!+
   */
  static decodeJSFuck(code: string): string {
    try {
      // Check if it's JSFuck (only contains []()!+ and whitespace)
      if (!/^[\[\]()!+\s]+$/.test(code.trim())) {
        throw new Error('Not valid JSFuck code');
      }
      
      // Use eval to execute and get result
      const result = this.evalHolder.call(window, code);
      return typeof result === 'string' ? result : String(result);
    } catch (error) {
      throw new Error(`JSFuck decode failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Decode AAEncode obfuscated code
   * AAEncode uses Japanese emoticons (ﾟωﾟﾉ, etc.)
   */
  static decodeAAEncode(code: string): string {
    try {
      // Check if it's AAEncode (contains characteristic patterns)
      if (!code.includes('ﾟωﾟﾉ') && !code.includes('ﾟΘﾟ')) {
        throw new Error('Not valid AAEncode code');
      }
      
      const result = this.evalHolder.call(window, code);
      return typeof result === 'string' ? result : String(result);
    } catch (error) {
      throw new Error(`AAEncode decode failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Decode JJEncode obfuscated code
   * JJEncode uses only symbols: $, _, [, ], (, ), +, !, etc.
   */
  static decodeJJEncode(code: string): string {
    try {
      // Check if it's JJEncode (contains characteristic $={} pattern)
      if (!code.includes('$=') || !code.includes('~[]')) {
        throw new Error('Not valid JJEncode code');
      }
      
      const result = this.evalHolder.call(window, code);
      return typeof result === 'string' ? result : String(result);
    } catch (error) {
      throw new Error(`JJEncode decode failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Decode URL encoded strings
   */
  static decodeURL(code: string): string {
    try {
      return decodeURIComponent(code);
    } catch (error) {
      throw new Error(`URL decode failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Decode Base64 encoded strings
   */
  static decodeBase64(code: string): string {
    try {
      return atob(code.trim());
    } catch (error) {
      throw new Error(`Base64 decode failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Decode hex encoded strings (\x41\x42\x43 -> ABC)
   */
  static decodeHex(code: string): string {
    return code.replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) => 
      String.fromCharCode(parseInt(hex, 16))
    );
  }

  /**
   * Decode unicode encoded strings (\u0041\u0042 -> AB)
   */
  static decodeUnicode(code: string): string {
    return code
      .replace(/\\u([0-9A-Fa-f]{4})/g, (_, hex) => 
        String.fromCharCode(parseInt(hex, 16))
      )
      .replace(/\\u\{([0-9A-Fa-f]+)\}/g, (_, hex) => 
        String.fromCodePoint(parseInt(hex, 16))
      );
  }

  /**
   * Unpack array-based obfuscation
   * Example: var _0x1234 = ['string1', 'string2']; _0x1234[0]
   */
  static unpackArrayObfuscation(code: string): string {
    try {
      // Find array declarations
      const arrayMatches = code.matchAll(/var\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(\[[^\]]*\]);?/g);
      let result = code;
      
      for (const match of arrayMatches) {
        const varName = match[1];
        const arrayContent = match[2];
        
        try {
          // Safely evaluate the array
          const arr = this.evalHolder.call(window, `(${arrayContent})`);
          
          if (Array.isArray(arr)) {
            // Replace array access with actual values
            const regex = new RegExp(`${this.escapeRegex(varName)}\\[(\\d+)\\]`, 'g');
            result = result.replace(regex, (_, index) => {
              const idx = parseInt(index);
              if (idx >= 0 && idx < arr.length) {
                const value = arr[idx];
                return typeof value === 'string' ? `"${value.replace(/"/g, '\\"')}"` : String(value);
              }
              return _;
            });
          }
        } catch (e) {
          // Skip this array if evaluation fails
          continue;
        }
      }
      
      return result;
    } catch (error) {
      throw new Error(`Array unpacking failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Smart auto-detect and decode various obfuscation methods
   */
  static smartDecode(code: string): string {
    const trimmed = code.trim();
    
    // Try JSFuck
    if (/^[\[\]()!+\s]+$/.test(trimmed)) {
      try {
        return this.decodeJSFuck(trimmed);
      } catch (e) {
        // Continue to next method
      }
    }
    
    // Try AAEncode
    if (trimmed.includes('ﾟωﾟﾉ') || trimmed.includes('ﾟΘﾟ')) {
      try {
        return this.decodeAAEncode(trimmed);
      } catch (e) {
        // Continue to next method
      }
    }
    
    // Try JJEncode
    if (trimmed.includes('$=') && trimmed.includes('~[]')) {
      try {
        return this.decodeJJEncode(trimmed);
      } catch (e) {
        // Continue to next method
      }
    }
    
    // Try Base64
    if (/^[A-Za-z0-9+/]+=*$/.test(trimmed) && trimmed.length % 4 === 0) {
      try {
        const decoded = this.decodeBase64(trimmed);
        if (decoded && decoded.length > 0) {
          return decoded;
        }
      } catch (e) {
        // Continue to next method
      }
    }
    
    // Try URL decode
    if (trimmed.includes('%')) {
      try {
        const decoded = this.decodeURL(trimmed);
        if (decoded !== trimmed) {
          return decoded;
        }
      } catch (e) {
        // Continue to next method
      }
    }
    
    // Try hex/unicode decode
    if (trimmed.includes('\\x') || trimmed.includes('\\u')) {
      let decoded = this.decodeHex(trimmed);
      decoded = this.decodeUnicode(decoded);
      if (decoded !== trimmed) {
        return decoded;
      }
    }
    
    // Try array unpacking
    if (trimmed.includes('var ') && /\[.*\]/.test(trimmed)) {
      try {
        const unpacked = this.unpackArrayObfuscation(trimmed);
        if (unpacked !== trimmed) {
          return unpacked;
        }
      } catch (e) {
        // Continue to next method
      }
    }
    
    // Try standard eval decode
    if (trimmed.includes('eval(')) {
      try {
        return this.decode(trimmed);
      } catch (e) {
        // Continue to next method
      }
    }
    
    return code;
  }

  // ========== OBFUSCATION METHODS ==========

  /**
   * Encode to AAEncode (Japanese emoticons)
   */
  static encodeAAEncode(code: string): string {
    const t = 'ﾟωﾟﾉ= /｀ｍ´）ﾉ ~┻━┻   //*´∇｀*/ [\'\\\',/*´∇｀*/];';
    const encoded = code.split('').map(char => {
      const c = char.charCodeAt(0);
      return `ﾟΘﾟ.ﾟ${c.toString(8)}ﾟ`;
    }).join('+');
    
    return `${t}\no=(ﾟｰﾟ)  =_=3;\nc=(ﾟΘﾟ) =(ﾟｰﾟ)-(ﾟｰﾟ);\n\n(ﾟДﾟ) =(ﾟΘﾟ)= (o^_^o)/ (o^_^o);\n(ﾟДﾟ)={ﾟΘﾟ: '_' ,ﾟωﾟﾉ : ((ﾟωﾟﾉ==3) +'_') [ﾟΘﾟ]};\n\n(ﾟДﾟ) [ﾟΘﾟ] =((ﾟωﾟﾉ==3) +'_') [c^_^o];\n\n(ﾟДﾟ) ['c'] = ((ﾟДﾟ)+'_') [ (ﾟｰﾟ)+(ﾟｰﾟ)-(ﾟΘﾟ) ];\n\n(ﾟДﾟ) ['o'] = ((ﾟДﾟ)+'_') [ﾟΘﾟ];\n\n(ﾟoﾟ)=(ﾟДﾟ) ['c']+(ﾟДﾟ) ['o']+(ﾟωﾟﾟ)+ ((ﾟωﾟﾟ)+'_')[ﾟΘﾟ];\n\n(ﾟДﾟ) ['_'] =((ﾟДﾟ)+'_') [ (ﾟｰﾟ)+(ﾟｰﾟ)];\n\n(ﾟεﾟ)=((ﾟｰﾟ) +'_')[ﾟΘﾟ];\n\n(ﾟДﾟ) ['ﾟΘﾟﾉ']=(ﾟДﾟ+ ﾟｰﾟ)[o^_^o -(ﾟΘﾟ)];\n\n(oﾟｰﾟo)= (ﾟωﾟﾟ +'_')[c^_^o];\n\n(ﾟДﾟ) [ﾟoﾟ]='\"';\n\n(ﾟДﾟ) ['_'] ( (ﾟДﾟ) ['_'] (ﾟεﾟ+(ﾟДﾟ)[ﾟoﾟ]+ ${encoded}+(ﾟДﾟ)[ﾟoﾟ]) (ﾟΘﾟ)) ('_');`;
  }

  /**
   * Encode to JJEncode
   */
  static encodeJJEncode(code: string): string {
    const gv = '$';
    const av = '_';
    let r = '';
    
    const encodeChar = (c: string) => {
      const cc = c.charCodeAt(0);
      return `${gv}.${av}[${cc}]`;
    };
    
    r += `${gv}=~[];\n`;
    r += `${gv}={___:++${gv},$$$$:(![]+"")[${gv}],__$:++${gv},$_$_:(![]+"")[${gv}],_$_:++${gv},$_$$:({}+"")[${gv}],$$_$:(${gv}[${gv}]+"")[${gv}],_$$:++${gv},$$$_:(!""+"")[${gv}],$__:++${gv},$_$:++${gv},$$__:({}+"")[${gv}],$$_:++${gv},$$$:++${gv},$___:++${gv},$__$:++${gv}};\n`;
    r += `${gv}.${av}=(${gv}.${av}=${gv}+"")[${gv}.$_$]+(${gv}.${av}=${gv}.${av})[${gv}.__$]+`;
    r += `(${gv}.$$=(${gv}.$+"")[${gv}.__$])+((!${gv})+"")[${gv}._$$]+(${gv}.__=${gv}.${av})[${gv}.$$_]+`;
    r += `(${gv}.$=${gv}.${av})[${gv}.___]+(${gv}.${gv}=(${gv}.$+"")[${gv}.___])+((!${gv})+"")[${gv}._$_]+`;
    r += `(${gv}.__=${gv}.${av})[${gv}.$$_]+(${gv}.${av}=""+${gv})[${gv}.__$]+(${gv}.${av}=${gv}.${av})[${gv}.$_$]+`;
    r += `${gv}.$$;\n`;
    
    const encoded = code.split('').map(encodeChar).join('+');
    r += `${gv}.${av}(${encoded})()`;
    
    return r;
  }

  /**
   * Encode string to hex format (\x41\x42\x43)
   */
  static encodeHex(code: string): string {
    return code.split('').map(char => 
      '\\x' + char.charCodeAt(0).toString(16).padStart(2, '0')
    ).join('');
  }

  /**
   * Encode string to unicode format (\u0041\u0042)
   */
  static encodeUnicode(code: string): string {
    return code.split('').map(char => 
      '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0')
    ).join('');
  }

  /**
   * Encode to URL encoding
   */
  static encodeURL(code: string): string {
    return encodeURIComponent(code);
  }

  /**
   * Encode to Base64
   */
  static encodeBase64(code: string): string {
    return btoa(code);
  }

  /**
   * Advanced obfuscation with string encoding and variable renaming
   * This is a custom implementation combining multiple obfuscation techniques
   */
  static obfuscateAdvanced(code: string, options: {
    stringEncoding?: 'hex' | 'unicode' | 'base64';
    controlFlow?: boolean;
    deadCode?: boolean;
  } = {}): string {
    let result = code;
    
    // Random variable name generator
    const generateVarName = (() => {
      let counter = 0;
      return () => {
        const prefix = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        return `_0x${(counter++).toString(16)}${prefix}${Math.random().toString(36).substring(2, 6)}`;
      };
    })();
    
    // Extract and encode strings
    const stringRegex = /(['"`])((?:\\.|(?!\1)[^\\])*)\1/g;
    const strings: Array<{original: string, encoded: string}> = [];
    result = result.replace(stringRegex, (_match, _quote, content) => {
      const placeholder = `___STR_${strings.length}___`;
      
      // Encode string based on option
      let encoded = content;
      const encodingType = options.stringEncoding || (['hex', 'unicode', 'base64'] as const)[Math.floor(Math.random() * 3)];
      
      if (encodingType === 'hex') {
        encoded = content.split('').map((char: string) => 
          '\\x' + char.charCodeAt(0).toString(16).padStart(2, '0')
        ).join('');
        strings.push({original: content, encoded: `"${encoded}"`});
      } else if (encodingType === 'unicode') {
        encoded = content.split('').map((char: string) => 
          '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0')
        ).join('');
        strings.push({original: content, encoded: `"${encoded}"`});
      } else if (encodingType === 'base64') {
        encoded = btoa(content);
        strings.push({original: content, encoded: `atob("${encoded}")`});
      } else {
        strings.push({original: content, encoded: `"${content}"`});
      }
      
      return placeholder;
    });
    
    // Replace variable names (skip keywords)
    const varMap = new Map<string, string>();
    const keywords = new Set(['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'typeof', 'instanceof', 'delete', 'void', 'async', 'await', 'class', 'extends', 'import', 'export', 'from', 'default', 'yield', 'console', 'log', 'alert', 'window', 'document', 'Math', 'String', 'Number', 'Boolean', 'Array', 'Object', 'Date', 'Error', 'RegExp', 'atob', 'btoa']);
    
    result = result.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, (match) => {
      if (keywords.has(match) || match.startsWith('___STR_')) {
        return match;
      }
      if (!varMap.has(match)) {
        varMap.set(match, generateVarName());
      }
      return varMap.get(match)!;
    });
    
    // Restore strings
    result = result.replace(/___STR_(\d+)___/g, (_, index) => {
      return strings[parseInt(index)].encoded;
    });
    
    // Add dead code (simple, non-breaking)
    if (options.deadCode) {
      const deadVar = generateVarName();
      result = `var ${deadVar}=false;if(${deadVar}){console.log("x");}` + result;
    }
    
    return result;
  }

  /**
   * MurrCoder Extreme - Maximum obfuscation with working code
   * Combines: array encoding, computed properties, string splitting, self-decoding
   */
  static encodeMurrCoderExtreme(code: string): string {
    try {
      // Step 1: Convert code to array of char codes
      const charCodes = [];
      for (let i = 0; i < code.length; i++) {
        charCodes.push(code.charCodeAt(i));
      }

      // Step 2: Create obfuscated array name
      const arrayVar = '_0x' + Math.random().toString(36).substring(2, 8);
      const funcVar = '_0x' + Math.random().toString(36).substring(2, 8);
      const loopVar = '_0x' + Math.random().toString(36).substring(2, 8);
      const resultVar = '_0x' + Math.random().toString(36).substring(2, 8);

      // Step 3: Encode char codes with mathematical operations
      const encodedArray = charCodes.map((code) => {
        const operations = [
          () => code.toString(),
          () => `${code + 1}-1`,
          () => `${code - 1}+1`,
          () => `${code * 2}/2`,
          () => `${Math.floor(code / 2)}*2${code % 2 === 1 ? '+1' : ''}`,
        ];
        return operations[Math.floor(Math.random() * operations.length)]();
      });

      // Step 4: Split array into chunks to avoid patterns
      const chunkSize = 3 + Math.floor(Math.random() * 5);
      const chunks: string[][] = [];
      for (let i = 0; i < encodedArray.length; i += chunkSize) {
        chunks.push(encodedArray.slice(i, i + chunkSize));
      }

      // Step 5: Create self-extracting code
      const obfuscatedCode = `
(function(){
var ${arrayVar}=[${encodedArray.join(',')}];
var ${funcVar}=function(${loopVar}){
return String['fromCharCode'](${loopVar});
};
var ${resultVar}='';
for(var i=0;i<${arrayVar}['length'];i++){
${resultVar}+=${funcVar}(${arrayVar}[i]);
}
return ${resultVar};
})()`;

      // Step 6: Wrap in eval with additional obfuscation
      const evalVar = '_0x' + Math.random().toString(36).substring(2, 8);
      const wrapperCode = `
(function(${evalVar}){
var code=${obfuscatedCode};
return (function(){return eval(code);})();
})(this)`;

      // Step 7: Minify the result
      return this.minify(wrapperCode);
    } catch (error) {
      throw new Error(`MurrCoder Extreme encoding failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
