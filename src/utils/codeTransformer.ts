/**
 * JavaScript Code Transformer
 * © 2025 Murr | https://github.com/vtstv
 */

export interface PackerResult {
  encoded: string;
  dictionary: string[];
}

export class CodeTransformer {
  private static readonly BASE62_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

  static encode(sourceCode: string, base62: boolean = true): string {
    if (!base62) {
      return this.simpleCompress(sourceCode);
    }

    const tokens = this.tokenize(sourceCode);
    const { dictionary, mapping } = this.buildDictionary(tokens);
    const compressed = this.replaceTokens(sourceCode, mapping);

    return this.wrapInPacker(compressed, dictionary);
  }

  private static tokenize(code: string): string[] {
    const tokenPattern = /\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/g;
    const matches = code.match(tokenPattern) || [];
    const frequency = new Map<string, number>();

    matches.forEach(token => {
      frequency.set(token, (frequency.get(token) || 0) + 1);
    });

    return Array.from(frequency.entries())
      .filter(([token, count]) => count > 1 && token.length > 2)
      .sort((a, b) => b[1] - a[1])
      .map(([token]) => token);
  }

  private static buildDictionary(tokens: string[]): { dictionary: string[]; mapping: Map<string, string> } {
    const dictionary: string[] = [];
    const mapping = new Map<string, string>();

    tokens.forEach((token, index) => {
      dictionary.push(token);
      mapping.set(token, this.toBase62(index));
    });

    return { dictionary, mapping };
  }

  private static toBase62(num: number): string {
    if (num === 0) return '0';
    
    let result = '';
    while (num > 0) {
      result = this.BASE62_CHARS[num % 62] + result;
      num = Math.floor(num / 62);
    }
    return result;
  }

  private static replaceTokens(code: string, mapping: Map<string, string>): string {
    let result = code;
    
    mapping.forEach((replacement, token) => {
      const regex = new RegExp(`\\b${token}\\b`, 'g');
      result = result.replace(regex, replacement);
    });

    return result;
  }

  private static wrapInPacker(compressed: string, dictionary: string[]): string {
    const escapedCode = compressed
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r');

    const dictString = dictionary.join('|');
    const base = dictionary.length;

    return `eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c]);return p}('${escapedCode}',${base},${base},'${dictString}'.split('|'),0,{}))`;
  }

  private static simpleCompress(code: string): string {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
}
