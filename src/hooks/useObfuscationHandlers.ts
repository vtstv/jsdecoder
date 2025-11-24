/**
 * Hooks for obfuscation operations
 */
import { useCallback } from 'react';
import { CodeTransformer } from '../utils/codeTransformer';
import { Translations } from '../i18n/translations';

interface UseObfuscationHandlersProps {
  code: string;
  inputCode: string;
  splitMode: boolean;
  setCode: (code: string) => void;
  setOutputCode: (code: string) => void;
  t: Translations;
}

export const useObfuscationHandlers = ({
  code,
  inputCode,
  splitMode,
  setCode,
  setOutputCode,
  t,
}: UseObfuscationHandlersProps) => {
  const handleEncodeAAEncode = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.encodeAAEncode(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleEncodeJJEncode = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.encodeJJEncode(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleEncodeHex = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.encodeHex(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleEncodeUnicode = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.encodeUnicode(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleEncodeURL = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.encodeURL(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleEncodeBase64 = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.encodeBase64(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleObfuscateAdvanced = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.obfuscateAdvanced(sourceCode, {
        stringEncoding: 'hex',
        controlFlow: true,
        deadCode: true
      });
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleEncodeMurrCoder = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.encodeMurrCoderExtreme(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  return {
    handleEncodeAAEncode,
    handleEncodeJJEncode,
    handleEncodeHex,
    handleEncodeUnicode,
    handleEncodeURL,
    handleEncodeBase64,
    handleObfuscateAdvanced,
    handleEncodeMurrCoder,
  };
};
