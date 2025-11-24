import { css } from '@emotion/react';
import { Theme } from '../theme/theme';
import { CodeEditor } from './CodeEditor';
import { DiffEditor } from './DiffEditor';
import { Translations } from '../i18n/translations';

interface CodeEditorSectionProps {
  theme: Theme;
  t: Translations;
  splitMode: boolean;
  compareMode: boolean;
  useMonacoEditor: boolean;
  code: string;
  inputCode: string;
  outputCode: string;
  originalCode: string;
  onCodeChange: (value: string) => void;
  onInputChange: (value: string) => void;
}

export function CodeEditorSection({
  theme,
  t,
  splitMode,
  compareMode,
  useMonacoEditor,
  code,
  inputCode,
  outputCode,
  originalCode,
  onCodeChange,
  onInputChange,
}: CodeEditorSectionProps) {
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

  const labelStyle = css`
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${theme.text};
  `;

  if (splitMode) {
    return (
      <div css={css`display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;`}>
        <div css={textareaContainerStyle}>
          <div css={labelStyle}>{t.input}</div>
          {useMonacoEditor ? (
            <CodeEditor
              value={inputCode}
              onChange={onInputChange}
              theme={theme}
              placeholder={t.inputPlaceholder}
              height="500px"
            />
          ) : (
            <textarea
              css={textareaStyle}
              value={inputCode}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={t.inputPlaceholder}
            />
          )}
        </div>
        <div css={textareaContainerStyle}>
          <div css={labelStyle}>{t.output}</div>
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
    );
  }

  if (compareMode) {
    if (useMonacoEditor) {
      return (
        <div css={css`position: relative;`}>
          <div css={labelStyle}>Comparison: Original → Decoded</div>
          <DiffEditor
            original={originalCode}
            modified={code}
            theme={theme}
            height="600px"
          />
        </div>
      );
    }
    
    return (
      <div css={css`display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;`}>
        <div css={textareaContainerStyle}>
          <div css={labelStyle}>Original</div>
          <textarea
            css={textareaStyle}
            value={originalCode}
            readOnly
            placeholder={t.inputPlaceholder}
          />
        </div>
        <div css={textareaContainerStyle}>
          <div css={labelStyle}>Decoded</div>
          <textarea
            css={textareaStyle}
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            placeholder={t.outputPlaceholder}
          />
        </div>
      </div>
    );
  }

  return (
    <div css={textareaContainerStyle}>
      {useMonacoEditor ? (
        <CodeEditor
          value={code}
          onChange={onCodeChange}
          theme={theme}
          placeholder={t.inputPlaceholder}
          height="500px"
        />
      ) : (
        <textarea
          css={textareaStyle}
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder={t.inputPlaceholder}
        />
      )}
    </div>
  );
}
