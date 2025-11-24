/**
 * JavaScript Code Transformer
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
      
      return result;
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
}
