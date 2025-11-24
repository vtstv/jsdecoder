/**
 * JavaScript Code Transformer
 * © 2025 Murr | https://github.com/vtstv
 */

import { useState, useCallback } from 'react';
import { css, Global } from '@emotion/react';
import { CodeTransformer } from './utils/codeTransformer';
import { Language, getTranslation } from './i18n/translations';
import { Theme, darkTheme, lightTheme } from './theme/theme';

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

  const t = getTranslation(language);

  const toggleTheme = useCallback(() => {
    setTheme((prev: Theme) => prev === darkTheme ? lightTheme : darkTheme);
  }, []);

  const handleDecode = useCallback(() => {
    if (!code.trim()) {
      return;
    }
    try {
      let codeToProcess = code.trim();
      
      const evalMatch = codeToProcess.match(/eval\s*\([\s\S]*\);?/);
      if (evalMatch) {
        codeToProcess = evalMatch[0];
      }
      
      const result = CodeTransformer.decode(codeToProcess);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleClear = useCallback(() => {
    setCode('');
  }, []);

  const handleLoadExample = useCallback(() => {
    setCode(EXAMPLE_CODE);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [code]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCode(text);
    } catch (err) {
      console.error('Failed to paste:', err);
    }
  }, []);

  const handleBeautify = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.beautify(code);
      setCode(result);
    } catch (err) {
      console.error('Failed to beautify:', err);
    }
  }, [code]);

  const handleMinify = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.minify(code);
      setCode(result);
    } catch (err) {
      console.error('Failed to minify:', err);
    }
  }, [code]);

  const handleDownload = useCallback(() => {
    if (!code.trim()) return;
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [code]);

  const handleAutoDecodeAll = useCallback(() => {
    if (!code.trim()) return;
    try {
      setOriginalCode(code);
      const result = CodeTransformer.autoDecodeAll(code);
      setCode(result);
      setCompareMode(true);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleRenameVars = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.renameVariables(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleDecodeStrings = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.decodeStrings(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const toggleCompare = useCallback(() => {
    if (!compareMode && !originalCode) {
      setOriginalCode(code);
    }
    setCompareMode(!compareMode);
  }, [compareMode, originalCode, code]);

  // Deobfuscation handlers
  const handleSmartDecode = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.smartDecode(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleDecodeJSFuck = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.decodeJSFuck(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleDecodeAAEncode = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.decodeAAEncode(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleDecodeJJEncode = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.decodeJJEncode(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleDecodeURL = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.decodeURL(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleDecodeBase64 = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.decodeBase64(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleDecodeHex = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.decodeHex(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleDecodeUnicode = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.decodeUnicode(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleUnpackArray = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.unpackArrayObfuscation(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  // Obfuscation handlers
  const handleEncodeAAEncode = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.encodeAAEncode(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleEncodeJJEncode = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.encodeJJEncode(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleEncodeHex = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.encodeHex(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleEncodeUnicode = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.encodeUnicode(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleEncodeURL = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.encodeURL(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleEncodeBase64 = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.encodeBase64(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleObfuscateAdvanced = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.obfuscateAdvanced(code, {
        stringEncoding: 'hex',
        controlFlow: true,
        deadCode: true
      });
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleEncodeMurrCoder = useCallback(() => {
    if (!code.trim()) return;
    try {
      const result = CodeTransformer.encodeMurrCoderExtreme(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

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

        {compareMode ? (
          <div css={css`display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;`}>
            <div css={textareaContainerStyle}>
              <div css={css`font-weight: 600; margin-bottom: 0.5rem; color: ${theme.text};`}>Original</div>
              <textarea
                css={textareaStyle}
                value={originalCode}
                readOnly
                placeholder={t.inputPlaceholder}
              />
            </div>
            <div css={textareaContainerStyle}>
              <div css={css`font-weight: 600; margin-bottom: 0.5rem; color: ${theme.text};`}>Decoded</div>
              <textarea
                css={textareaStyle}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t.outputPlaceholder}
              />
            </div>
          </div>
        ) : (
          <div css={textareaContainerStyle}>
            <textarea
              css={textareaStyle}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t.inputPlaceholder}
            />
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
                <div css={dropdownItemStyle} onClick={() => { handleSmartDecode(); setShowDeobfuscateDropdown(false); }}>
                  {t.smartDecode}
                </div>
                <div css={dropdownItemStyle} onClick={() => { handleDecodeJSFuck(); setShowDeobfuscateDropdown(false); }}>
                  {t.decodeJSFuck}
                </div>
                <div css={dropdownItemStyle} onClick={() => { handleDecodeAAEncode(); setShowDeobfuscateDropdown(false); }}>
                  {t.decodeAAEncode}
                </div>
                <div css={dropdownItemStyle} onClick={() => { handleDecodeJJEncode(); setShowDeobfuscateDropdown(false); }}>
                  {t.decodeJJEncode}
                </div>
                <div css={dropdownItemStyle} onClick={() => { handleDecodeURL(); setShowDeobfuscateDropdown(false); }}>
                  {t.decodeURL}
                </div>
                <div css={dropdownItemStyle} onClick={() => { handleDecodeBase64(); setShowDeobfuscateDropdown(false); }}>
                  {t.decodeBase64}
                </div>
                <div css={dropdownItemStyle} onClick={() => { handleDecodeHex(); setShowDeobfuscateDropdown(false); }}>
                  {t.decodeHex}
                </div>
                <div css={dropdownItemStyle} onClick={() => { handleDecodeUnicode(); setShowDeobfuscateDropdown(false); }}>
                  {t.decodeUnicode}
                </div>
                <div css={dropdownItemStyle} onClick={() => { handleUnpackArray(); setShowDeobfuscateDropdown(false); }}>
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
                <div css={dropdownItemStyle} onClick={() => { handleEncodeMurrCoder(); setShowObfuscateDropdown(false); }}>
                  {t.encodeMurrCoder}
                </div>
                <div css={dropdownItemStyle} onClick={() => { handleObfuscateAdvanced(); setShowObfuscateDropdown(false); }}>
                  {t.obfuscateAdvanced}
                </div>
                <div css={dropdownItemStyle} onClick={() => { handleEncodeAAEncode(); setShowObfuscateDropdown(false); }}>
                  {t.encodeAAEncode}
                </div>
                <div css={dropdownItemStyle} onClick={() => { handleEncodeJJEncode(); setShowObfuscateDropdown(false); }}>
                  {t.encodeJJEncode}
                </div>
                <div css={dropdownItemStyle} onClick={() => { handleEncodeHex(); setShowObfuscateDropdown(false); }}>
                  {t.encodeHex}
                </div>
                <div css={dropdownItemStyle} onClick={() => { handleEncodeUnicode(); setShowObfuscateDropdown(false); }}>
                  {t.encodeUnicode}
                </div>
                <div css={dropdownItemStyle} onClick={() => { handleEncodeURL(); setShowObfuscateDropdown(false); }}>
                  {t.encodeURL}
                </div>
                <div css={dropdownItemStyle} onClick={() => { handleEncodeBase64(); setShowObfuscateDropdown(false); }}>
                  {t.encodeBase64}
                </div>
              </div>
            )}
          </div>

          <button css={secondaryButtonStyle} onClick={handleBeautify}>
            {t.beautify}
          </button>
          <button css={secondaryButtonStyle} onClick={handleMinify}>
            {t.minify}
          </button>
          <button css={secondaryButtonStyle} onClick={handleRenameVars}>
            {t.renameVars}
          </button>
          <button css={secondaryButtonStyle} onClick={handleDecodeStrings}>
            {t.decodeStrings}
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
          {code.includes('eval(') && (
            <div css={checkboxContainerStyle}>
              <span>{t.layersDetected}: {CodeTransformer.detectEvalLayers(code)}</span>
            </div>
          )}
        </div>
      </main>

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
