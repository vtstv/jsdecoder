/**
 * Encoding methods for obfuscation
 * © 2025 Murr | https://github.com/vtstv
 */

export class Encoders {
  /**
   * AAEncode obfuscation
   */
  static encodeAAEncode(code: string): string {
    const encode = (c: string) => {
      const cc = c.charCodeAt(0);
      return `(ﾟДﾟ)[ﾟεﾟ]+(ﾟДﾟ)[ﾟωﾟﾉ]+(ﾟДﾟ)[ﾟoﾟ]+(ﾟДﾟ)[ﾟДﾟﾉ]+(ﾟДﾟ)[ﾟДﾟﾉ]+(ﾟДﾟ)[ﾟεﾟ]+((${cc >> 4}).toString(16))+(ﾟДﾟ)[ﾟДﾟﾉ]+((${cc & 15}).toString(16))`;
    };

    const encoded = code.split('').map(encode).join('+');
    return `(ﾟДﾟ)[ﾟoﾟﾉ]=(ﾟДﾟ)[ﾟoﾟﾉ]=(ﾟωﾟﾉ)-(ﾟωﾟﾉ);(o゜ー゜o)=(ﾟωﾟﾉ)-(ﾟДﾟ)[ﾟεﾟ];(ﾟДﾟ)[ﾟoﾟ]=(ﾟωﾟﾉ)-(ﾟДﾟ)[ﾟoﾟﾉ];(ﾟДﾟ)[ﾟДﾟﾉ]=(ﾟДﾟ)[ﾟεﾟ]+(ﾟДﾟ)[ﾟoﾟ]+(ﾟωﾟﾉ);(ﾟДﾟ)[ﾟωﾟﾉ]=(ﾟДﾟ)[ﾟεﾟ]+(ﾟДﾟ)[ﾟoﾟﾉ];(ﾟДﾟ)['c']=(ﾟДﾟ)['c'];(ﾟДﾟ)['constructor']='c'+(ﾟДﾟ)['c'];(ﾟДﾟ)[ﾟεﾟ]='\\\\';(ﾟДﾟ).ﾟΘﾟﾉ=(ﾟДﾟ+ﾟДﾟ)[o゜ー゜o-(ﾟДﾟ)];(ﾟДﾟ)['constructor']('return eval(unescape(${encoded}))'))();`;
  }

  /**
   * JJEncode obfuscation
   */
  static encodeJJEncode(code: string): string {
    const encode = (c: string) => {
      const cc = c.charCodeAt(0);
      return `$$+${cc.toString(8)}`;
    };

    const encoded = code.split('').map(encode).join('+');
    return `$=~[];$={___:++$,$$$$:(![]+"")[$],__$:++$,$_$_:(![]+"")[$],_$_:++$,$_$$:({}+"")[$],$$_$:($[$]+"")[$],_$$:++$,$$$_:(!""+"")[$],$__:++$,$_$:++$,$$__:({}+"")[$],$$_:++$,$$$:++$,$___:++$,$__$:++$};$.$_=($.$_=$+"")[$.$_$]+($._$=$.$_[$.__$])+($.$$=($.$+"")[$.__$])+((!$)+"")[$._$$]+($.__=$.$_[$.$$_])+($.$=(!""+"")[$.__$])+($._=(!""+"")[$._$_])+$.$_[$.$_$]+$.__+$._$+$.$;$.$$=$.$+(!""+"")[$._$$]+$.__+$._+$.$+$.$$;$.$=($.___)[$.$_][$.$_];$.$($.$($.$$+"\\""+${encoded}+"\\"")())();`;
  }

  /**
   * Hex encoding
   */
  static encodeHex(code: string): string {
    return code.split('').map(c => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
  }

  /**
   * Unicode encoding
   */
  static encodeUnicode(code: string): string {
    return code.split('').map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('');
  }

  /**
   * URL encoding
   */
  static encodeURL(code: string): string {
    return encodeURIComponent(code);
  }

  /**
   * Base64 encoding
   */
  static encodeBase64(code: string): string {
    return btoa(unescape(encodeURIComponent(code)));
  }

  /**
   * Advanced obfuscation
   */
  static obfuscateAdvanced(code: string, options: {
    stringEncoding?: 'hex' | 'unicode' | 'base64';
    controlFlow?: boolean;
    deadCode?: boolean;
  } = {}): string {
    let result = code;

    // String encoding
    if (options.stringEncoding) {
      result = result.replace(/(['"])(?:\\.|(?!\1)[^\\])*\1/g, (match) => {
        const str = match.slice(1, -1);
        const quote = match[0];
        let encoded = '';
        
        switch (options.stringEncoding) {
          case 'hex':
            encoded = str.split('').map(c => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
            break;
          case 'unicode':
            encoded = str.split('').map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('');
            break;
          case 'base64':
            const b64 = btoa(unescape(encodeURIComponent(str)));
            return `atob(${quote}${b64}${quote})`;
        }
        
        return `${quote}${encoded}${quote}`;
      });
    }

    // Control flow flattening (basic)
    if (options.controlFlow) {
      result = result.replace(/if\s*\(([^)]+)\)\s*{([^}]+)}/g, (_match, condition, body) => {
        return `((${condition})?function(){${body}}:function(){})();`;
      });
    }

    // Dead code injection
    if (options.deadCode) {
      const deadCodes = [
        'var _0x1234 = function(){}; _0x1234();',
        'if(false){console.log("dead code");}',
        'var _0xabcd = 0; _0xabcd++;'
      ];
      const deadCode = deadCodes[Math.floor(Math.random() * deadCodes.length)];
      result = deadCode + result;
    }

    return result;
  }

  /**
   * MurrCoder Extreme obfuscation
   */
  static encodeMurrCoderExtreme(code: string): string {
    // Multi-layer obfuscation with all techniques
    let result = code;

    // Layer 1: String to hex arrays
    result = result.replace(/(['"])(?:\\.|(?!\1)[^\\])*\1/g, (match) => {
      const str = match.slice(1, -1);
      const hexArray = str.split('').map(c => 
        '0x' + c.charCodeAt(0).toString(16)
      ).join(',');
      return `String.fromCharCode(${hexArray})`;
    });

    // Layer 2: Variable name obfuscation
    const varMap = new Map<string, string>();
    let varCounter = 0;
    result = result.replace(/\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/g, (match) => {
      if (['var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while', 'String', 'fromCharCode'].includes(match)) {
        return match;
      }
      if (!varMap.has(match)) {
        varMap.set(match, '_0x' + (varCounter++).toString(16));
      }
      return varMap.get(match)!;
    });

    // Layer 3: Control flow obfuscation
    result = result.replace(/if\s*\(([^)]+)\)\s*{([^}]+)}/g, (_match, condition, body) => {
      return `((${condition})?function(){${body}}:function(){})();`;
    });

    // Layer 4: Wrap in eval with encoding
    const encoded = result.split('').map(c => 
      '0x' + c.charCodeAt(0).toString(16)
    ).join(',');

    return `eval(String.fromCharCode(${encoded}))`;
  }
}
