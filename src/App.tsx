/**
 * JavaScript Code Transformer
 * © 2025 Murr | https://github.com/vtstv
 */

import { useState, useCallback } from 'react';
import { css } from '@emotion/react';
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
  const [useBase62, setUseBase62] = useState(true);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = getTranslation(language);

  const toggleTheme = useCallback(() => {
    setTheme((prev: Theme) => prev === darkTheme ? lightTheme : darkTheme);
  }, []);

  const handleDecode = useCallback(() => {
    if (!code.trim()) {
      return;
    }
    try {
      const result = CodeTransformer.decode(code);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, t.errorPrefix]);

  const handleEncode = useCallback(() => {
    if (!code.trim()) {
      return;
    }
    try {
      const result = CodeTransformer.encode(code, useBase62);
      setCode(result);
    } catch (error) {
      alert(t.errorPrefix + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, [code, useBase62, t.errorPrefix]);

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

  const containerStyle = css`
    min-height: 100vh;
    background: ${theme.background};
    color: ${theme.text};
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    transition: all 0.3s ease;
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
    min-height: 200px;
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

  const textareaActionsStyle = css`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    gap: 0.5rem;
  `;

  const smallButtonStyle = css`
    background: ${theme.surface}ee;
    color: ${theme.text};
    border: 1px solid ${theme.border};
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 500;
    transition: all 0.2s ease;
    backdrop-filter: blur(4px);

    &:hover {
      background: ${theme.border}ee;
    }

    &:active {
      transform: translateY(1px);
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
    padding: 0.6rem 2.5rem 0.6rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.2s ease;
    position: relative;
    min-width: 120px;
    text-align: left;

    &:hover {
      background: ${theme.border};
    }

    &::after {
      content: '▼';
      position: absolute;
      right: 0.8rem;
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
    min-width: 120px;
    z-index: 1000;
    overflow: hidden;
  `;

  const dropdownItemStyle = css`
    padding: 0.7rem 1rem;
    cursor: pointer;
    transition: background 0.2s ease;
    color: ${theme.text};

    &:hover {
      background: ${theme.border};
    }
  `;

  return (
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
        <div css={textareaContainerStyle}>
          <textarea
            css={textareaStyle}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t.inputPlaceholder}
          />
          <div css={textareaActionsStyle}>
            <button css={smallButtonStyle} onClick={handlePaste}>
              {t.paste}
            </button>
            <button css={smallButtonStyle} onClick={handleCopy}>
              {copied ? t.copied : t.copy}
            </button>
          </div>
        </div>

        <div css={actionGroupStyle}>
          <button css={buttonStyle} onClick={handleDecode}>
            {t.decode}
          </button>
          <button css={buttonStyle} onClick={handleEncode}>
            {t.encode}
          </button>
          <button css={secondaryButtonStyle} onClick={handleClear}>
            {t.clear}
          </button>
          <button css={secondaryButtonStyle} onClick={handleLoadExample}>
            {t.loadExample}
          </button>
          <div css={checkboxContainerStyle}>
            <input
              type="checkbox"
              id="base62"
              checked={useBase62}
              onChange={(e) => setUseBase62(e.target.checked)}
            />
            <label htmlFor="base62">
              {useBase62 ? t.base62Encode : t.simpleCompress}
            </label>
          </div>
        </div>
      </main>

      <footer css={footerStyle}>
        <p>
          {t.copyrightText} | <a href="https://github.com/vtstv" target="_blank" rel="noopener noreferrer">GitHub: vtstv</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
