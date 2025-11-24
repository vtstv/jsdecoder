import { css } from '@emotion/react';
import { Theme } from '../theme/theme';
import { Language, Translations } from '../i18n/translations';

interface HeaderProps {
  title: string;
  language: Language;
  languageNames: Record<Language, string>;
  showLangDropdown: boolean;
  theme: Theme;
  isDarkTheme: boolean;
  t: Translations;
  onLanguageChange: (lang: Language) => void;
  onToggleLangDropdown: () => void;
  onToggleTheme: () => void;
}

export function Header({
  title,
  language,
  languageNames,
  showLangDropdown,
  theme,
  isDarkTheme,
  t,
  onLanguageChange,
  onToggleLangDropdown,
  onToggleTheme,
}: HeaderProps) {
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
    z-index: 1000;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
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

  return (
    <header css={headerStyle}>
      <h1 css={titleStyle}>{title}</h1>
      <div css={controlsStyle}>
        <div css={dropdownContainerStyle}>
          <button css={dropdownButtonStyle} onClick={onToggleLangDropdown}>
            {languageNames[language]}
          </button>
          {showLangDropdown && (
            <div css={dropdownMenuStyle}>
              {Object.entries(languageNames).map(([lang, name]) => (
                <div
                  key={lang}
                  css={dropdownItemStyle}
                  onClick={() => {
                    onLanguageChange(lang as Language);
                    onToggleLangDropdown();
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
          )}
        </div>
        <button css={iconButtonStyle} onClick={onToggleTheme} title={t.toggleTheme}>
          {isDarkTheme ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
