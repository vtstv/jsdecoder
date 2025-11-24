/**
 * Decoding methods for deobfuscation
 * © 2025 Murr | https://github.com/vtstv
 */

export class Decoders {
  /**
   * AAEncode decoding
   */
  static decodeAAEncode(code: string): string {
    try {
      // AAEncode creates eval code, we need to extract and execute it safely
      const evalHolder = window.eval;
      let result = '';
      
      window.eval = function(decodedCode: string): any {
        result = decodedCode;
        return decodedCode;
      };
      
      try {
        evalHolder.call(window, code);
      } catch (e) {
        // If direct eval fails, try extracting the encoded part
        const match = code.match(/\(ﾟДﾟ\)\['constructor'\]\('return eval\(unescape\(([^)]+)\)\)'\)\)/);
        if (match) {
          const encoded = match[1];
          result = unescape(evalHolder.call(window, encoded));
        }
      }
      
      window.eval = evalHolder;
      return result || code;
    } catch (error) {
      throw new Error(`AAEncode decoding failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * JJEncode decoding
   */
  static decodeJJEncode(code: string): string {
    try {
      const evalHolder = window.eval;
      let result = '';
      
      window.eval = function(decodedCode: string): any {
        result = decodedCode;
        return decodedCode;
      };
      
      try {
        evalHolder.call(window, code);
      } catch (e) {
        // Fallback: try to extract encoded string
        throw new Error('JJEncode decoding failed');
      }
      
      window.eval = evalHolder;
      return result || code;
    } catch (error) {
      throw new Error(`JJEncode decoding failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Hex decoding
   */
  static decodeHex(code: string): string {
    try {
      return code.replace(/\\x([0-9a-fA-F]{2})/g, (_match, hex) => {
        return String.fromCharCode(parseInt(hex, 16));
      });
    } catch (error) {
      throw new Error(`Hex decoding failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Unicode decoding
   */
  static decodeUnicode(code: string): string {
    try {
      return code.replace(/\\u([0-9a-fA-F]{4})/g, (_match, hex) => {
        return String.fromCharCode(parseInt(hex, 16));
      });
    } catch (error) {
      throw new Error(`Unicode decoding failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * URL decoding
   */
  static decodeURL(code: string): string {
    try {
      return decodeURIComponent(code);
    } catch (error) {
      throw new Error(`URL decoding failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Base64 decoding
   */
  static decodeBase64(code: string): string {
    try {
      return decodeURIComponent(escape(atob(code)));
    } catch (error) {
      throw new Error(`Base64 decoding failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * JSFuck decoding
   */
  static decodeJSFuck(code: string): string {
    try {
      const evalHolder = window.eval;
      let result = '';
      
      window.eval = function(decodedCode: string): any {
        result = decodedCode;
        return decodedCode;
      };
      
      try {
        evalHolder.call(window, code);
      } catch (e) {
        throw new Error('Failed to decode JSFuck');
      }
      
      window.eval = evalHolder;
      return result || code;
    } catch (error) {
      throw new Error(`JSFuck decoding failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
