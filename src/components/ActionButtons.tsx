import { css } from '@emotion/react';
import { Theme } from '../theme/theme';
import { Translations } from '../i18n/translations';

interface ActionButtonsProps {
  theme: Theme;
  t: Translations;
  useMonacoEditor: boolean;
  compareMode: boolean;
  splitMode: boolean;
  copied: boolean;
  onToggleMonaco: () => void;
  onToggleCompare: () => void;
  onToggleSplit: () => void;
  onPaste: () => void;
  onCopy: () => void;
  onRun: () => void;
}

export function ActionButtons({
  theme,
  t,
  useMonacoEditor,
  compareMode,
  splitMode,
  copied,
  onToggleMonaco,
  onToggleCompare,
  onToggleSplit,
  onPaste,
  onCopy,
  onRun,
}: ActionButtonsProps) {
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

  const toggleButtonStyle = css`
    background: ${useMonacoEditor ? theme.primary : theme.surface};
    color: ${useMonacoEditor ? '#ffffff' : theme.text};
    border: 2px solid ${useMonacoEditor ? theme.primary : theme.border};
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      background: ${useMonacoEditor ? theme.primaryHover : theme.border};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px ${theme.shadow};
    }

    &:active {
      transform: translateY(0);
    }

    &::before {
      content: '${useMonacoEditor ? '✓' : '○'}';
      font-size: 1.1rem;
      font-weight: bold;
    }
  `;

  const createToggleStyle = (isActive: boolean) => css`
    background: ${isActive ? theme.primary : theme.surface};
    color: ${isActive ? '#ffffff' : theme.text};
    border: 2px solid ${isActive ? theme.primary : theme.border};
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      background: ${isActive ? theme.primaryHover : theme.border};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px ${theme.shadow};
    }

    &:active {
      transform: translateY(0);
    }

    &::before {
      content: '${isActive ? '✓' : '○'}';
      font-size: 1.1rem;
      font-weight: bold;
    }
  `;

  return (
    <div css={css`display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1rem; justify-content: center;`}>
      <button css={toggleButtonStyle} onClick={onToggleMonaco}>
        {t.useMonaco}
      </button>
      <button css={createToggleStyle(compareMode)} onClick={onToggleCompare}>
        {t.compareMode}
      </button>
      <button css={createToggleStyle(splitMode)} onClick={onToggleSplit}>
        {t.splitMode}
      </button>
      <button css={secondaryButtonStyle} onClick={onPaste}>
        {t.paste}
      </button>
      <button css={secondaryButtonStyle} onClick={onCopy}>
        {copied ? t.copied : t.copy}
      </button>
      <button css={buttonStyle} onClick={onRun}>
        {t.run}
      </button>
    </div>
  );
}
