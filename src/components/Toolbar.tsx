import { css } from '@emotion/react';
import { Theme } from '../theme/theme';
import { Translations } from '../i18n/translations';

interface ToolbarProps {
  theme: Theme;
  t: Translations;
  code: string;
  showDeobfuscateDropdown: boolean;
  showObfuscateDropdown: boolean;
  onDecode: () => void;
  onAutoDecodeAll: () => void;
  onToggleDeobfuscateDropdown: () => void;
  onToggleObfuscateDropdown: () => void;
  onBeautify: () => void;
  onMinify: () => void;
  onRenameVars: () => void;
  onDecodeStrings: () => void;
  onSecurityScan: () => void;
  onClear: () => void;
  onLoadExample: () => void;
  deobfuscationHandlers: any;
  obfuscationHandlers: any;
  evalLayersCount: number;
}

export function Toolbar({
  theme,
  t,
  code,
  showDeobfuscateDropdown,
  showObfuscateDropdown,
  onDecode,
  onAutoDecodeAll,
  onToggleDeobfuscateDropdown,
  onToggleObfuscateDropdown,
  onBeautify,
  onMinify,
  onRenameVars,
  onDecodeStrings,
  onSecurityScan,
  onClear,
  onLoadExample,
  deobfuscationHandlers,
  obfuscationHandlers,
  evalLayersCount,
}: ToolbarProps) {
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

  const actionGroupStyle = css`
    display: flex;
    gap: 0.75rem;
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

  const checkboxContainerStyle = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${theme.text};
    font-size: 0.9rem;
  `;

  return (
    <div css={actionGroupStyle}>
      <button css={buttonStyle} onClick={onDecode}>
        {t.decode}
      </button>
      <button css={buttonStyle} onClick={onAutoDecodeAll}>
        {t.autoDecodeAll}
      </button>
      
      <div css={dropdownContainerStyle}>
        <button css={dropdownButtonStyle} onClick={onToggleDeobfuscateDropdown}>
          {t.deobfuscation}
        </button>
        {showDeobfuscateDropdown && (
          <div css={dropdownMenuStyle}>
            <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleSmartDecode(); onToggleDeobfuscateDropdown(); }}>
              {t.smartDecode}
            </div>
            <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleDecodeJSFuck(); onToggleDeobfuscateDropdown(); }}>
              {t.decodeJSFuck}
            </div>
            <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleDecodeAAEncode(); onToggleDeobfuscateDropdown(); }}>
              {t.decodeAAEncode}
            </div>
            <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleDecodeJJEncode(); onToggleDeobfuscateDropdown(); }}>
              {t.decodeJJEncode}
            </div>
            <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleDecodeURL(); onToggleDeobfuscateDropdown(); }}>
              {t.decodeURL}
            </div>
            <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleDecodeBase64(); onToggleDeobfuscateDropdown(); }}>
              {t.decodeBase64}
            </div>
            <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleDecodeHex(); onToggleDeobfuscateDropdown(); }}>
              {t.decodeHex}
            </div>
            <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleDecodeUnicode(); onToggleDeobfuscateDropdown(); }}>
              {t.decodeUnicode}
            </div>
            <div css={dropdownItemStyle} onClick={() => { deobfuscationHandlers.handleUnpackArray(); onToggleDeobfuscateDropdown(); }}>
              {t.unpackArray}
            </div>
          </div>
        )}
      </div>

      <div css={dropdownContainerStyle}>
        <button css={dropdownButtonStyle} onClick={onToggleObfuscateDropdown}>
          {t.obfuscation}
        </button>
        {showObfuscateDropdown && (
          <div css={dropdownMenuStyle}>
            <div css={dropdownItemStyle} onClick={() => { obfuscationHandlers.handleEncodeMurrCoder(); onToggleObfuscateDropdown(); }}>
              {t.encodeMurrCoder}
            </div>
            <div css={dropdownItemStyle} onClick={() => { obfuscationHandlers.handleObfuscateAdvanced(); onToggleObfuscateDropdown(); }}>
              {t.obfuscateAdvanced}
            </div>
            <div css={dropdownItemStyle} onClick={() => { obfuscationHandlers.handleEncodeAAEncode(); onToggleObfuscateDropdown(); }}>
              {t.encodeAAEncode}
            </div>
            <div css={dropdownItemStyle} onClick={() => { obfuscationHandlers.handleEncodeJJEncode(); onToggleObfuscateDropdown(); }}>
              {t.encodeJJEncode}
            </div>
            <div css={dropdownItemStyle} onClick={() => { obfuscationHandlers.handleEncodeHex(); onToggleObfuscateDropdown(); }}>
              {t.encodeHex}
            </div>
            <div css={dropdownItemStyle} onClick={() => { obfuscationHandlers.handleEncodeUnicode(); onToggleObfuscateDropdown(); }}>
              {t.encodeUnicode}
            </div>
            <div css={dropdownItemStyle} onClick={() => { obfuscationHandlers.handleEncodeURL(); onToggleObfuscateDropdown(); }}>
              {t.encodeURL}
            </div>
            <div css={dropdownItemStyle} onClick={() => { obfuscationHandlers.handleEncodeBase64(); onToggleObfuscateDropdown(); }}>
              {t.encodeBase64}
            </div>
          </div>
        )}
      </div>

      <button css={secondaryButtonStyle} onClick={onBeautify}>
        {t.beautify}
      </button>
      <button css={secondaryButtonStyle} onClick={onMinify}>
        {t.minify}
      </button>
      <button css={secondaryButtonStyle} onClick={onRenameVars}>
        {t.renameVars}
      </button>
      <button css={secondaryButtonStyle} onClick={onDecodeStrings}>
        {t.decodeStrings}
      </button>
      <button css={secondaryButtonStyle} onClick={onSecurityScan}>
        {t.securityScan}
      </button>
      <button css={secondaryButtonStyle} onClick={onClear}>
        {t.clear}
      </button>
      <button css={secondaryButtonStyle} onClick={onLoadExample}>
        {t.loadExample}
      </button>
      {code.includes('eval(') && (
        <div css={checkboxContainerStyle}>
          <span>{t.layersDetected}: {evalLayersCount}</span>
        </div>
      )}
    </div>
  );
}
