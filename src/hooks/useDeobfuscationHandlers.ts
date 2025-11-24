/**
 * Hooks for deobfuscation operations
 */
import { useCallback } from 'react';
import { CodeTransformer } from '../utils/codeTransformer';
import { Translations } from '../i18n/translations';

interface UseDeobfuscationHandlersProps {
  code: string;
  inputCode: string;
  splitMode: boolean;
  setCode: (code: string) => void;
  setOutputCode: (code: string) => void;
  t: Translations;
}

export const useDeobfuscationHandlers = ({
  code,
  inputCode,
  splitMode,
  setCode,
  setOutputCode,
  t,
}: UseDeobfuscationHandlersProps) => {
  const handleSmartDecode = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.smartDecode(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleDecodeJSFuck = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.decodeJSFuck(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleDecodeAAEncode = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.decodeAAEncode(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleDecodeJJEncode = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.decodeJJEncode(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleDecodeURL = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.decodeURL(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleDecodeBase64 = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.decodeBase64(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleDecodeHex = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.decodeHex(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleDecodeUnicode = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.decodeUnicode(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleUnpackArray = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.unpackArrayObfuscation(sourceCode);
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
    handleSmartDecode,
    handleDecodeJSFuck,
    handleDecodeAAEncode,
    handleDecodeJJEncode,
    handleDecodeURL,
    handleDecodeBase64,
    handleDecodeHex,
    handleDecodeUnicode,
    handleUnpackArray,
  };
};
