/**
 * Security Scan Results Component
 * © 2025 Murr | https://github.com/vtstv
 */

import { css } from '@emotion/react';
import { SecurityScanResult, SecurityScanner } from '../utils/securityScanner';
import { Theme } from '../theme/theme';

interface SecurityPanelProps {
  result: SecurityScanResult;
  theme: Theme;
  onClose: () => void;
}

export const SecurityPanel: React.FC<SecurityPanelProps> = ({ result, theme, onClose }) => {
  const panelStyle = css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${theme.surface};
    border: 1px solid ${theme.border};
    border-radius: 8px;
    padding: 24px;
    max-width: 700px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    color: ${theme.text};
  `;

  const overlayStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  `;

  const headerStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid ${theme.border};
  `;

  const scoreStyle = css`
    font-size: 48px;
    font-weight: bold;
    color: ${SecurityScanner.getThreatLevelColor(result.threatLevel)};
    margin: 20px 0;
    text-align: center;
  `;

  const threatLevelStyle = css`
    text-align: center;
    font-size: 18px;
    margin-bottom: 24px;
    padding: 12px;
    background: ${SecurityScanner.getThreatLevelColor(result.threatLevel)}22;
    border-radius: 6px;
    color: ${SecurityScanner.getThreatLevelColor(result.threatLevel)};
    font-weight: 600;
  `;

  const threatItemStyle = css`
    background: ${theme.background};
    border-left: 4px solid ${theme.primary};
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 4px;
  `;

  const threatHeaderStyle = css`
    font-weight: 600;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const severityBadgeStyle = (severity: string) => css`
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    background: ${
      severity === 'critical' ? '#d32f2f' :
      severity === 'high' ? '#f44336' :
      severity === 'medium' ? '#ff9800' :
      '#4caf50'
    };
    color: white;
  `;

  const closeButtonStyle = css`
    background: ${theme.primary};
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      background: ${theme.primaryHover};
    }
  `;

  const noThreatsStyle = css`
    text-align: center;
    padding: 40px 20px;
    color: ${theme.textSecondary};
    font-size: 16px;
  `;

  return (
    <>
      <div css={overlayStyle} onClick={onClose} />
      <div css={panelStyle}>
        <div css={headerStyle}>
          <h2 style={{ margin: 0, fontSize: '24px' }}>🔒 Security Scan Results</h2>
          <button css={closeButtonStyle} onClick={onClose}>Close</button>
        </div>

        <div css={scoreStyle}>
          {result.score}/100
        </div>

        <div css={threatLevelStyle}>
          {SecurityScanner.getThreatLevelDescription(result.threatLevel)}
        </div>

        {result.threats.length === 0 ? (
          <div css={noThreatsStyle}>
            ✅ No security threats detected!<br />
            This code appears to be safe.
          </div>
        ) : (
          <div>
            <h3 style={{ marginTop: 0, marginBottom: 16, fontSize: '18px' }}>
              Detected Threats ({result.threats.length})
            </h3>
            {result.threats.map((threat, index) => (
              <div key={index} css={threatItemStyle}>
                <div css={threatHeaderStyle}>
                  <span>{threat.description}</span>
                  <span css={severityBadgeStyle(threat.severity)}>
                    {threat.severity.toUpperCase()}
                  </span>
                </div>
                {threat.line && (
                  <div style={{ fontSize: '13px', color: theme.textSecondary, marginBottom: 8 }}>
                    Line: {threat.line}
                  </div>
                )}
                <div style={{ fontSize: '14px', marginBottom: 8 }}>
                  <strong>Type:</strong> {threat.type.replace(/-/g, ' ')}
                </div>
                <div style={{ fontSize: '14px', color: theme.textSecondary }}>
                  <strong>Recommendation:</strong> {threat.recommendation}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
