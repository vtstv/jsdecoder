/**
 * JavaScript Code Transformer
 * © 2025 Murr | https://github.com/vtstv
 * Licensed under MIT License
 */

import { useState, useCallback, useEffect } from 'react';
import { css, Global } from '@emotion/react';
import { CodeTransformer } from './utils/codeTransformer';
import { Language, getTranslation } from './i18n/translations';
import { Theme, darkTheme, lightTheme } from './theme/theme';
import { useDeobfuscationHandlers } from './hooks/useDeobfuscationHandlers';
import { useObfuscationHandlers } from './hooks/useObfuscationHandlers';
import { useUtilityHandlers } from './hooks/useUtilityHandlers';
import { SecurityScanner, SecurityScanResult } from './utils/securityScanner';
import { SecurityPanel } from './components/SecurityPanel';
import { Dialog } from './components/Dialog';
import { Header } from './components/Header';
import { ActionButtons } from './components/ActionButtons';
import { CodeEditorSection } from './components/CodeEditorSection';
import { Toolbar } from './components/Toolbar';
import { Footer } from './components/Footer';

const EXAMPLE_CODE = `eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c]);return p}('0.1("2 3!");',4,4,'console|log|Hello|World'.split('|'),0,{}))`;

const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'En',
  ru: 'Ru',
  de: 'De',
};

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('jsdecoder_theme');
    return saved === 'light' ? lightTheme : darkTheme;
  });
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('jsdecoder_language');
    return (saved as Language) || 'en';
  });
  const [code, setCode] = useState('');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showDeobfuscateDropdown, setShowDeobfuscateDropdown] = useState(false);
  const [showObfuscateDropdown, setShowObfuscateDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [originalCode, setOriginalCode] = useState('');
  const [splitMode, setSplitMode] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [useMonacoEditor, setUseMonacoEditor] = useState(() => {
    const saved = localStorage.getItem('jsdecoder_useMonaco');
    return saved === 'true';
  });
  const [securityResult, setSecurityResult] = useState<SecurityScanResult | null>(null);
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);

  const t = getTranslation(language);

  useEffect(() => {
    localStorage.setItem('jsdecoder_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('jsdecoder_useMonaco', String(useMonacoEditor));
  }, [useMonacoEditor]);

  const toggleTheme = useCallback(() => {
    setTheme((prev: Theme) => {
      const newTheme = prev === darkTheme ? lightTheme : darkTheme;
      localStorage.setItem('jsdecoder_theme', newTheme === lightTheme ? 'light' : 'dark');
      return newTheme;
    });
  }, []);

  const handleDecode = useCallback(() => {
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
      setDialogMessage(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const handleClear = useCallback(() => {
    setCode('');
  }, []);

  const handleLoadExample = useCallback(() => {
    setCode(EXAMPLE_CODE);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      const textToCopy = splitMode ? outputCode : code;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [code, outputCode, splitMode]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (splitMode) {
        setInputCode(text);
      } else {
        setCode(text);
      }
    } catch (err) {
      console.error('Failed to paste:', err);
    }
  }, [splitMode]);

  const handleAutoDecodeAll = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) return;
    try {
      if (splitMode) {
        const result = CodeTransformer.autoDecodeAll(sourceCode);
        setOutputCode(result);
      } else {
        setOriginalCode(sourceCode);
        const result = CodeTransformer.autoDecodeAll(sourceCode);
        setCode(result);
        setCompareMode(true);
      }
    } catch (error) {
      setDialogMessage(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, inputCode, splitMode, t.errorPrefix]);

  const toggleCompare = useCallback(() => {
    if (!compareMode && !originalCode) {
      setOriginalCode(code);
    }
    setCompareMode(!compareMode);
  }, [compareMode, originalCode, code]);

  const toggleSplit = useCallback(() => {
    if (!splitMode) {
      setInputCode(code);
      setOutputCode('');
      setCompareMode(false);
    } else {
      setCode(outputCode || inputCode);
    }
    setSplitMode(!splitMode);
  }, [splitMode, code, inputCode, outputCode]);

  const deobfuscationHandlers = useDeobfuscationHandlers({
    code,
    inputCode,
    splitMode,
    setCode,
    setOutputCode,
    t,
    setDialogMessage,
  });

  const obfuscationHandlers = useObfuscationHandlers({
    code,
    inputCode,
    splitMode,
    setCode,
    setOutputCode,
    t,
    setDialogMessage,
  });

  const utilityHandlers = useUtilityHandlers({
    code,
    inputCode,
    splitMode,
    setCode,
    setOutputCode,
    t,
    setDialogMessage,
  });

  const handleSecurityScan = useCallback(() => {
    const sourceCode = splitMode ? (inputCode || outputCode) : code;
    if (!sourceCode.trim()) {
      setDialogMessage('No code to scan');
      return;
    }
    const result = SecurityScanner.scanCode(sourceCode);
    setSecurityResult(result);
  }, [code, inputCode, outputCode, splitMode]);

  const handleRun = useCallback(() => {
    if (!code.trim()) return;
    
    const originalAlert = window.alert;
    const logs: string[] = [];
    
    window.alert = function(msg: unknown) {
      logs.push('Alert: ' + String(msg));
    };
    
    const originalLog = console.log;
    console.log = function(...args: unknown[]) {
      logs.push('Log: ' + args.map(a => String(a)).join(' '));
      originalLog.apply(console, args);
    };
    
    try {
      const result = eval(code);
      
      window.alert = originalAlert;
      console.log = originalLog;
      
      let output = '';
      if (logs.length > 0) {
        output = logs.join('\n');
      }
      if (result !== undefined) {
        if (output) output += '\n\n';
        output += 'Result: ' + String(result);
      }
      
      if (output) {
        setDialogMessage(output);
      } else {
        setDialogMessage('Code executed successfully (no output)');
      }
    } catch (error) {
      window.alert = originalAlert;
      console.log = originalLog;
      setDialogMessage(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const containerStyle = css`
    min-height: 100vh;
    background: ${theme.background};
    color: ${theme.text};
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    transition: all 0.3s ease;
    box-sizing: border-box;
  `;

  const mainContentStyle = css`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    gap: 1.5rem;
  `;

  return (
    <>
      <Global
        styles={css`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html, body {
            width: 100%;
            height: 100%;
            overflow-x: hidden;
          }
          
          body {
            background: ${theme.background};
          }
        `}
      />
      <div css={containerStyle}>
        <Header
          title={t.title}
          language={language}
          languageNames={LANGUAGE_NAMES}
          showLangDropdown={showLangDropdown}
          theme={theme}
          isDarkTheme={theme === darkTheme}
          t={t}
          onLanguageChange={setLanguage}
          onToggleLangDropdown={() => setShowLangDropdown(!showLangDropdown)}
          onToggleTheme={toggleTheme}
        />

        <main css={mainContentStyle}>
          <ActionButtons
            theme={theme}
            t={t}
            useMonacoEditor={useMonacoEditor}
            copied={copied}
            onToggleMonaco={() => setUseMonacoEditor(!useMonacoEditor)}
            onToggleCompare={toggleCompare}
            onToggleSplit={toggleSplit}
            onPaste={handlePaste}
            onCopy={handleCopy}
            onRun={handleRun}
          />

          <CodeEditorSection
            theme={theme}
            t={t}
            splitMode={splitMode}
            compareMode={compareMode}
            useMonacoEditor={useMonacoEditor}
            code={code}
            inputCode={inputCode}
            outputCode={outputCode}
            originalCode={originalCode}
            onCodeChange={setCode}
            onInputChange={setInputCode}
          />

          <Toolbar
            theme={theme}
            t={t}
            code={code}
            showDeobfuscateDropdown={showDeobfuscateDropdown}
            showObfuscateDropdown={showObfuscateDropdown}
            onDecode={handleDecode}
            onAutoDecodeAll={handleAutoDecodeAll}
            onToggleDeobfuscateDropdown={() => {
              setShowDeobfuscateDropdown(!showDeobfuscateDropdown);
              setShowObfuscateDropdown(false);
            }}
            onToggleObfuscateDropdown={() => {
              setShowObfuscateDropdown(!showObfuscateDropdown);
              setShowDeobfuscateDropdown(false);
            }}
            onBeautify={utilityHandlers.handleBeautify}
            onMinify={utilityHandlers.handleMinify}
            onRenameVars={utilityHandlers.handleRenameVars}
            onDecodeStrings={utilityHandlers.handleDecodeStrings}
            onSecurityScan={handleSecurityScan}
            onClear={handleClear}
            onLoadExample={handleLoadExample}
            deobfuscationHandlers={deobfuscationHandlers}
            obfuscationHandlers={obfuscationHandlers}
            evalLayersCount={CodeTransformer.detectEvalLayers(code)}
          />
        </main>

        {securityResult && (
          <SecurityPanel
            result={securityResult}
            theme={theme}
            onClose={() => setSecurityResult(null)}
          />
        )}

        {dialogMessage && (
          <Dialog
            message={dialogMessage}
            onClose={() => setDialogMessage(null)}
            theme={theme}
          />
        )}

        <Footer theme={theme} t={t} />
      </div>
    </>
  );
}

export default App;
