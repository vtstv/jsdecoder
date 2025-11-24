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

    const tokens = this.extractTokens(sourceCode);
    const dictionary = tokens.filter((token, index, self) => 
      self.indexOf(token) === index && token.length > 1
    );
    
    let compressed = sourceCode;
    dictionary.forEach((token, index) => {
      const regex = new RegExp(`\\b${this.escapeRegex(token)}\\b`, 'g');
      compressed = compressed.replace(regex, index.toString());
    });

    return this.wrapInPacker(compressed, dictionary, useCustomVars);
  }

  private static extractTokens(code: string): string[] {
    const tokenPattern = /\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/g;
    const matches = code.match(tokenPattern) || [];
    return matches;
  }

  private static escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private static wrapInPacker(compressed: string, dictionary: string[], useCustomVars: boolean = false): string {
    const escapedCode = compressed
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r');

    const dictString = dictionary.join('|');
    const base = dictionary.length;

    if (useCustomVars) {
      return `eval(function(m,u,r,R,_,__){_=String;if(!''.replace(/^/,String)){while(r--)__[r]=R[r]||r;R=[function(_){return __[_]}];_=function(){return'\\\\w+'};r=1};while(r--)if(R[r])m=m.replace(new RegExp('\\\\b'+_(r)+'\\\\b','g'),R[r]);return m}('${escapedCode}',${base},${base},'${dictString}'.split('|'),0,{}))`;
    }

    return `eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c]);return p}('${escapedCode}',${base},${base},'${dictString}'.split('|'),0,{}))`;
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
}
