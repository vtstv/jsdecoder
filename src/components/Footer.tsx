import { css } from '@emotion/react';
import { Theme } from '../theme/theme';
import { Translations } from '../i18n/translations';

interface FooterProps {
  theme: Theme;
  t: Translations;
}

export function Footer({ theme, t }: FooterProps) {
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

  return (
    <footer css={footerStyle}>
      <p>
        {t.copyrightText} | <a href="https://github.com/vtstv" target="_blank" rel="noopener noreferrer">GitHub: vtstv</a> | v1.2.0
      </p>
      <p css={css`font-size: 0.85rem; margin-top: 0.5rem; color: ${theme.textSecondary}; opacity: 0.8;`}>
        ⚠️ {t.disclaimer}
      </p>
    </footer>
  );
}
