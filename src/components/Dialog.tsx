import { css } from '@emotion/react';
import { Theme } from '../theme/theme';

interface DialogProps {
  message: string;
  onClose: () => void;
  theme: Theme;
}

export function Dialog({ message, onClose, theme }: DialogProps) {
  const overlayStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.2s ease;

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;

  const dialogStyle = css`
    background: ${theme.surface};
    border: 2px solid ${theme.primary};
    border-radius: 12px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    animation: slideIn 0.3s ease;

    @keyframes slideIn {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;

  const messageStyle = css`
    color: ${theme.text};
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    word-wrap: break-word;
    white-space: pre-wrap;
  `;

  const buttonStyle = css`
    background: ${theme.primary};
    color: #ffffff;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    width: 100%;
    transition: all 0.2s ease;

    &:hover {
      background: ${theme.primaryHover};
      transform: translateY(-1px);
      box-shadow: 0 4px 12px ${theme.primary}66;
    }

    &:active {
      transform: translateY(0);
    }
  `;

  return (
    <div css={overlayStyle} onClick={onClose}>
      <div css={dialogStyle} onClick={(e) => e.stopPropagation()}>
        <div css={messageStyle}>{message}</div>
        <button css={buttonStyle} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
