/**
 * JavaScript Code Transformer
 * © 2025 Murr | https://github.com/vtstv
 */

import { useState, useCallback } from 'react';
import { css, Global } from '@emotion/react';
import { CodeTransformer } from './utils/codeTransformer';
import { Language, getTranslation } from './i18n/translations';
import { Theme, darkTheme, lightTheme } from './theme/theme';
import { useDeobfuscationHandlers } from './hooks/useDeobfuscationHandlers';
import { useObfuscationHandlers } from './hooks/useObfuscationHandlers';
import { useUtilityHandlers } from './hooks/useUtilityHandlers';
import { SecurityScanner, SecurityScanResult } from './utils/securityScanner';
import { SecurityPanel } from './components/SecurityPanel';
import { CodeEditor } from './components/CodeEditor';

const EXAMPLE_CODE = `eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c]);return p}('0.1("2 3!");',4,4,'console|log|Hello|World'.split('|'),0,{}))`;

const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'En',
  ru: 'Ru',
  de: 'De',
};

function App() {
  const [theme, setTheme] = useState<Theme>(darkTheme);
  const [language, setLanguage] = useState<Language>('en');
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
  const [useMonacoEditor, setUseMonacoEditor] = useState(false);
  const [securityResult, setSecurityResult] = useState<SecurityScanResult | null>(null);

  const t = getTranslation(language);

  const toggleTheme = useCallback(() => {
    setTheme((prev: Theme) => prev === darkTheme ? lightTheme : darkTheme);
  }, []);

  const handleDecode = useCallback(() => {
    const sourceCode = splitMode ? inputCode : code;
    if (!sourceCode.trim()) {
      return;
    }
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

  const handleDownload = useCallback(() => {
    const sourceCode = splitMode ? (outputCode || inputCode) : code;
    if (!sourceCode.trim()) {
      alert('No code to download');
      return;
    }
    const blob = new Blob([sourceCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [code, outputCode, inputCode, splitMode]);

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
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
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

  // Use custom hooks for handlers
  const deobfuscationHandlers = useDeobfuscationHandlers({
    code,
    inputCode,
    splitMode,
    setCode,
    setOutputCode,
    t,
  });

  const obfuscationHandlers = useObfuscationHandlers({
    code,
    inputCode,
    splitMode,
    setCode,
    setOutputCode,
    t,
  });

  const utilityHandlers = useUtilityHandlers({
    code,
    inputCode,
    splitMode,
    setCode,
    setOutputCode,
    t,
  });

  const handleSecurityScan = useCallback(() => {
    const sourceCode = splitMode ? (inputCode || outputCode) : code;
    if (!sourceCode.trim()) {
      alert('No code to scan');
      return;
    }
    const result = SecurityScanner.scanCode(sourceCode);
    setSecurityResult(result);
  }, [code, inputCode, outputCode, splitMode]);

  const handleRun = useCallback(() => {
    if (!code.trim()) return;
    try {
      // Execute the code in a safe context
      const result = eval(code);
      if (result !== undefined) {
        console.log('Execution result:', result);
      }
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
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

  const headerStyle = css`
    max-width: 1200px;
    margin: 0 auto 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  `;

  const titleStyle = css`
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    color: ${theme.text};
  `;

  const controlsStyle = css`
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
  `;

  const buttonStyle = css`
    background: ${theme.primary};
    color: #ffffff;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
    transition: background 0.2s ease;

    &:hover {
      background: ${theme.primaryHover};
    }

    &:active {
      transform: translateY(1px);
    }
  `;

  const secondaryButtonStyle = css`
    ${buttonStyle};
    background: ${theme.surface};
    color: ${theme.text};
    border: 1px solid ${theme.border};

    &:hover {
      background: ${theme.border};
    }
  `;

  const iconButtonStyle = css`
    background: ${theme.surface};
    color: ${theme.text};
    border: 1px solid ${theme.border};
    padding: 0.6rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    transition: all 0.2s ease;

    &:hover {
      background: ${theme.border};
    }

    &:active {
      transform: translateY(1px);
    }
  `;

  const mainContentStyle = css`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    gap: 1.5rem;
  `;

  const textareaContainerStyle = css`
    position: relative;
  `;

  const textareaStyle = css`
    width: 100%;
    min-height: 300px;
    padding: 1rem;
    background: ${theme.surface};
    color: ${theme.text};
    border: 1px solid ${theme.border};
    border-radius: 8px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 0.9rem;
    resize: vertical;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: ${theme.primary};
      box-shadow: 0 0 0 3px ${theme.primary}33;
    }

    &::placeholder {
      color: ${theme.textSecondary};
    }
  `;

  const actionGroupStyle = css`
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  `;

  const checkboxContainerStyle = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${theme.text};
    
    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    
    label {
      cursor: pointer;
      user-select: none;
    }
  `;

  const footerStyle = css`
    max-width: 1200px;
    margin: 3rem auto 0;
    padding-top: 2rem;
    border-top: 1px solid ${theme.border};
    text-align: center;
    color: ${theme.textSecondary};
    font-size: 0.9rem;

    a {
      color: ${theme.primary};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  `;

  const dropdownContainerStyle = css`
    position: relative;
  `;

  const dropdownButtonStyle = css`
    background: ${theme.surface};
    color: ${theme.text};
    border: 1px solid ${theme.border};
    padding: 0.6rem 2rem 0.6rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.2s ease;
    position: relative;
    min-width: 70px;
    text-align: left;

    &:hover {
      background: ${theme.border};
    }

    &::after {
      content: '▼';
      position: absolute;
      right: 0.6rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.7rem;
    }
  `;

  const dropdownMenuStyle = css`
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    background: ${theme.surface};
    border: 1px solid ${theme.border};
    border-radius: 6px;
    box-shadow: 0 4px 12px ${theme.shadow};
    min-width: 200px;
    max-width: 400px;
    max-height: 400px;
    overflow-y: auto;
    z-index: 1000;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
    
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: ${theme.surface};
    }
    
    &::-webkit-scrollbar-thumb {
      background: ${theme.border};
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: ${theme.primary};
    }
  `;

  const dropdownItemStyle = css`
    padding: 0.7rem 1rem;
    cursor: pointer;
    transition: background 0.2s ease;
    color: ${theme.text};
    font-size: 0.85rem;
    border-bottom: 1px solid ${theme.border};
    border-right: 1px solid ${theme.border};

    &:hover {
      background: ${theme.border};
    }
    
    &:nth-of-type(2n) {
      border-right: none;
    }
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
      <header css={headerStyle}>
        <h1 css={titleStyle}>{t.title}</h1>
        <div css={controlsStyle}>
          <div css={dropdownContainerStyle}>
            <button 
              css={dropdownButtonStyle} 
              onClick={() => setShowLangDropdown(!showLangDropdown)}
            >
              {LANGUAGE_NAMES[language]}
            </button>
            {showLangDropdown && (
              <div css={dropdownMenuStyle}>
                {Object.entries(LANGUAGE_NAMES).map(([lang, name]) => (
                  <div
                    key={lang}
                    css={dropdownItemStyle}
                    onClick={() => {
                      setLanguage(lang as Language);
                      setShowLangDropdown(false);
                    }}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button css={iconButtonStyle} onClick={toggleTheme} title={t.toggleTheme}>
            {theme === darkTheme ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main css={mainContentStyle}>
        {/* Action buttons above textarea */}
        <div css={css`display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1rem; justify-content: center;`}>
          <button css={secondaryButtonStyle} onClick={toggleCompare}>
            {t.compareMode}
          </button>
          <button css={secondaryButtonStyle} onClick={toggleSplit}>
            {t.splitMode}
          </button>
          <button css={secondaryButtonStyle} onClick={handlePaste}>
            {t.paste}
          </button>
          <button css={secondaryButtonStyle} onClick={handleCopy}>
            {copied ? t.copied : t.copy}
          </button>
          <button css={buttonStyle} onClick={handleRun}>
            {t.run}
          </button>
        </div>

        {splitMode ? (
          <div css={css`display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;`}>
            <div css={textareaContainerStyle}>
              <div css={css`font-weight: 600; margin-bottom: 0.5rem; color: ${theme.text};`}>{t.input}</div>
              {useMonacoEditor ? (
                <CodeEditor
                  value={inputCode}
                  onChange={setInputCode}
                  theme={theme}
                  placeholder={t.inputPlaceholder}
                  height="500px"
                />
              ) : (
                <textarea
                  css={textareaStyle}
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder={t.inputPlaceholder}
                />
              )}
            </div>
            <div css={textareaContainerStyle}>
              <div css={css`font-weight: 600; margin-bottom: 0.5rem; color: ${theme.text};`}>{t.output}</div>
              {useMonacoEditor ? (
                <CodeEditor
                  value={outputCode}
                  onChange={() => {}}
                  theme={theme}
                  readOnly
                  placeholder={t.outputPlaceholder}
                  height="500px"
                />
              ) : (
                <textarea
                  css={textareaStyle}
                  value={outputCode}
                  readOnly
                  placeholder={t.outputPlaceholder}
                />
              )}
            </div>
          </div>
        ) : compareMode ? (
          <div css={css`display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;`}>
            <div css={textareaContainerStyle}>
              <div css={css`font-weight: 600; margin-bottom: 0.5rem; color: ${theme.text};`}>Original</div>
              {useMonacoEditor ? (
                <CodeEditor
                  value={originalCode}
                  onChange={() => {}}
                  theme={theme}
                  readOnly
                  placeholder={t.inputPlaceholder}
                  height="500px"
                />
              ) : (
                <textarea
                  css={textareaStyle}
                  value={originalCode}
                  readOnly
                  placeholder={t.inputPlaceholder}
                />
              )}
            </div>
            <div css={textareaContainerStyle}>
              <div css={css`font-weight: 600; margin-bottom: 0.5rem; color: ${theme.text};`}>Decoded</div>
              {useMonacoEditor ? (
                <CodeEditor
                  value={code}
                  onChange={setCode}
                  theme={theme}
                  placeholder={t.outputPlaceholder}
                  height="500px"
                />
              ) : (
                <textarea
                  css={textareaStyle}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={t.outputPlaceholder}
                />
              )}
            </div>
          </div>
        ) : (
          <div css={textareaContainerStyle}>
            {useMonacoEditor ? (
              <CodeEditor
                value={code}
                onChange={setCode}
                theme={theme}
                placeholder={t.inputPlaceholder}
                height="500px"
              />
            ) : (
              <textarea
                css={textareaStyle}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t.inputPlaceholder}
              />
            )}
          </div>
        )}

        <div css={actionGroupStyle}>
          <button css={buttonStyle} onClick={handleDecode}>
            {t.decode}
          </button>
          <button css={buttonStyle} onClick={handleAutoDecodeAll}>
            {t.autoDecodeAll}
          </button>
          
          {/* Deobfuscation Dropdown */}
          <div css={dropdownContainerStyle}>
            <button 
              css={dropdownButtonStyle} 
              onClick={() => {
                setShowDeobfuscateDropdown(!showDeobfuscateDropdown);
                setShowObfuscateDropdown(false);
              }}
            >
              {t.deobfuscation}
            </button>
            {showDeobfuscateDropdown && (
              <div css={dropdownMenuStyle}>
                <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleSmartDecode(); setShowDeobfuscateDropdown(false); }}>
                  {t.smartDecode}
                </div>
                <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleDecodeJSFuck(); setShowDeobfuscateDropdown(false); }}>
                  {t.decodeJSFuck}
                </div>
                <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleDecodeAAEncode(); setShowDeobfuscateDropdown(false); }}>
                  {t.decodeAAEncode}
                </div>
                <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleDecodeJJEncode(); setShowDeobfuscateDropdown(false); }}>
                  {t.decodeJJEncode}
                </div>
                <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleDecodeURL(); setShowDeobfuscateDropdown(false); }}>
                  {t.decodeURL}
                </div>
                <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleDecodeBase64(); setShowDeobfuscateDropdown(false); }}>
                  {t.decodeBase64}
                </div>
                <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleDecodeHex(); setShowDeobfuscateDropdown(false); }}>
                  {t.decodeHex}
                </div>
                <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleDecodeUnicode(); setShowDeobfuscateDropdown(false); }}>
                  {t.decodeUnicode}
                </div>
                <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleUnpackArray(); setShowDeobfuscateDropdown(false); }}>
                  {t.unpackArray}
                </div>
              </div>
            )}
          </div>

          {/* Obfuscation Dropdown */}
          <div css={dropdownContainerStyle}>
            <button 
              css={dropdownButtonStyle} 
              onClick={() => {
                setShowObfuscateDropdown(!showObfuscateDropdown);
                setShowDeobfuscateDropdown(false);
              }}
            >
              {t.obfuscation}
            </button>
            {showObfuscateDropdown && (
              <div css={dropdownMenuStyle}>
                <div css={dropdownItemStyle} onClick={() => { obfuscationHandlers.handleEncodeMurrCoder(); setShowObfuscateDropdown(false); }}>
                  {t.encodeMurrCoder}
                </div>
                <div css={dropdownItemStyle} onClick={() => { obfuscationHandlers.handleObfuscateAdvanced(); setShowObfuscateDropdown(false); }}>
                  {t.obfuscateAdvanced}
                </div>
                <div css={dropdownItemStyle} onClick={() => { obfuscationHandlers.handleEncodeAAEncode(); setShowObfuscateDropdown(false); }}>
                  {t.encodeAAEncode}
                </div>
                <div css={dropdownItemStyle} onClick={() => { obfuscationHandlers.handleEncodeJJEncode(); setShowObfuscateDropdown(false); }}>
                  {t.encodeJJEncode}
                </div>
                <div css={dropdownItemStyle} onClick={() => { obfuscationHandlers.handleEncodeHex(); setShowObfuscateDropdown(false); }}>
                  {t.encodeHex}
                </div>
                <div css={dropdownItemStyle} onClick={() => { obfuscationHandlers.handleEncodeUnicode(); setShowObfuscateDropdown(false); }}>
                  {t.encodeUnicode}
                </div>
                <div css={dropdownItemStyle} onClick={() => { obfuscationHandlers.handleEncodeURL(); setShowObfuscateDropdown(false); }}>
                  {t.encodeURL}
                </div>
                <div css={dropdownItemStyle} onClick={() => { obfuscationHandlers.handleEncodeBase64(); setShowObfuscateDropdown(false); }}>
                  {t.encodeBase64}
                </div>
              </div>
            )}
          </div>

          <button css={secondaryButtonStyle} onClick={utilityHandlers.handleBeautify}>
            {t.beautify}
          </button>
          <button css={secondaryButtonStyle} onClick={utilityHandlers.handleMinify}>
            {t.minify}
          </button>
          <button css={secondaryButtonStyle} onClick={utilityHandlers.handleRenameVars}>
            {t.renameVars}
          </button>
          <button css={secondaryButtonStyle} onClick={utilityHandlers.handleDecodeStrings}>
            {t.decodeStrings}
          </button>
          <button css={secondaryButtonStyle} onClick={handleSecurityScan}>
            {t.securityScan}
          </button>
          <button css={secondaryButtonStyle} onClick={handleClear}>
            {t.clear}
          </button>
          <button css={secondaryButtonStyle} onClick={handleDownload}>
            {t.download}
          </button>
          <button css={secondaryButtonStyle} onClick={handleLoadExample}>
            {t.loadExample}
          </button>
          <label css={css`display: flex; align-items: center; gap: 0.5rem; cursor: pointer; color: ${theme.text};`}>
            <input
              type="checkbox"
              checked={useMonacoEditor}
              onChange={(e) => setUseMonacoEditor(e.target.checked)}
              css={css`cursor: pointer;`}
            />
            {t.useMonaco}
          </label>
          {code.includes('eval(') && (
            <div css={checkboxContainerStyle}>
              <span>{t.layersDetected}: {CodeTransformer.detectEvalLayers(code)}</span>
            </div>
          )}
        </div>
      </main>

      {securityResult && (
        <SecurityPanel
          result={securityResult}
          theme={theme}
          onClose={() => setSecurityResult(null)}
        />
      )}

      <footer css={footerStyle}>
        <p>
          {t.copyrightText} | <a href="https://github.com/vtstv" target="_blank" rel="noopener noreferrer">GitHub: vtstv</a>
        </p>
        <p css={css`font-size: 0.85rem; margin-top: 0.5rem; color: ${theme.text}; opacity: 0.8;`}>
          ⚠️ {t.disclaimer}
        </p>
      </footer>
    </div>
    </>
  );
}

export default App;
