/**
 * Hooks for utility operations (beautify, minify, etc.)
 */
import { useCallback } from 'react';
import { CodeTransformer } from '../utils/codeTransformer';
import { Translations } from '../i18n/translations';

interface UseUtilityHandlersProps {
  code: string;
  inputCode: string;
  splitMode: boolean;
  setCode: (code: string) => void;
  setOutputCode: (code: string) => void;
  t: Translations;
  setDialogMessage: (message: string) => void;
}

export const useUtilityHandlers = ({
  code,
  inputCode,
  splitMode,
  setCode,
  setOutputCode,
  t,
  setDialogMessage,
}: UseUtilityHandlersProps) => {
  const handleBeautify = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.beautify(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (err) {
      console.error('Failed to beautify:', err);
    }
  }, [code, inputCode, splitMode]);

  const handleMinify = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.minify(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (err) {
      console.error('Failed to minify:', err);
    }
  }, [code, inputCode, splitMode]);

  const handleRenameVars = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.renameVariables(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      setDialogMessage(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleDecodeStrings = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      const result = CodeTransformer.decodeStrings(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      setDialogMessage(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleAutoDecodeAll = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) {
      return;
    }
    try {
      const result = CodeTransformer.autoDecodeAll(sourceCode);
      if (splitMode) {
        setOutputCode(result);
      } else {
        setCode(result);
      }
    } catch (error) {
      setDialogMessage(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  return {
    handleBeautify,
    handleMinify,
    handleRenameVars,
    handleDecodeStrings,
    handleAutoDecodeAll,
  };
};

