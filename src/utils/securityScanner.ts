/**
 * Security Scanner - detects malware and dangerous patterns in JavaScript code
 * © 2025 Murr | https://github.com/vtstv
 */

export interface SecurityScanResult {
  isSafe: boolean;
  threatLevel: 'safe' | 'low' | 'medium' | 'high' | 'critical';
  threats: SecurityThreat[];
  score: number; // 0-100, где 100 = полностью безопасный
}

export interface SecurityThreat {
  type: 'malware' | 'obfuscation' | 'network' | 'file-system' | 'code-injection' | 'data-exfiltration';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  pattern: string;
  line?: number;
  recommendation: string;
}

export class SecurityScanner {
  /**
   * Malware patterns database
   */
  private static readonly MALWARE_PATTERNS = [
    {
      pattern: /eval\s*\(\s*atob\s*\(/gi,
      type: 'malware' as const,
      severity: 'critical' as const,
      description: 'Base64 encoded eval execution - common malware technique',
      recommendation: 'Remove or decode the base64 string to inspect the actual code'
    },
    {
      pattern: /document\.write\s*\(\s*unescape\s*\(/gi,
      type: 'malware' as const,
      severity: 'high' as const,
      description: 'Dynamic script injection via document.write',
      recommendation: 'Review the unescaped content for malicious code'
    },
    {
      pattern: /Function\s*\(\s*['"`].*?['"`]\s*\)\s*\(/gi,
      type: 'code-injection' as const,
      severity: 'high' as const,
      description: 'Dynamic function creation - can execute arbitrary code',
      recommendation: 'Replace with static function declarations'
    },
    {
      pattern: /new\s+Function\s*\(/gi,
      type: 'code-injection' as const,
      severity: 'high' as const,
      description: 'Dynamic function constructor - potential code injection',
      recommendation: 'Use regular function declarations instead'
    },
    {
      pattern: /setTimeout\s*\(\s*['"`][^'"`]*?['"`]\s*,/gi,
      type: 'code-injection' as const,
      severity: 'medium' as const,
      description: 'setTimeout with string argument - eval equivalent',
      recommendation: 'Use function reference instead of string'
    },
    {
      pattern: /setInterval\s*\(\s*['"`][^'"`]*?['"`]\s*,/gi,
      type: 'code-injection' as const,
      severity: 'medium' as const,
      description: 'setInterval with string argument - eval equivalent',
      recommendation: 'Use function reference instead of string'
    }
  ];

  /**
   * Dangerous patterns that are often used in attacks
   */
  private static readonly DANGEROUS_PATTERNS = [
    {
      pattern: /XMLHttpRequest|fetch\s*\(/gi,
      type: 'network' as const,
      severity: 'medium' as const,
      description: 'Network requests detected - potential data exfiltration',
      recommendation: 'Verify all network endpoints are legitimate'
    },
    {
      pattern: /WebSocket\s*\(/gi,
      type: 'network' as const,
      severity: 'medium' as const,
      description: 'WebSocket connection - potential C&C communication',
      recommendation: 'Check WebSocket endpoint for legitimacy'
    },
    {
      pattern: /\.innerHTML\s*=/gi,
      type: 'code-injection' as const,
      severity: 'medium' as const,
      description: 'innerHTML manipulation - XSS vulnerability',
      recommendation: 'Use textContent or sanitize HTML input'
    },
    {
      pattern: /document\.cookie/gi,
      type: 'data-exfiltration' as const,
      severity: 'high' as const,
      description: 'Cookie access - potential session hijacking',
      recommendation: 'Ensure cookies are only accessed by legitimate code'
    },
    {
      pattern: /localStorage\.|sessionStorage\./gi,
      type: 'data-exfiltration' as const,
      severity: 'low' as const,
      description: 'Local storage access detected',
      recommendation: 'Verify stored data does not contain sensitive information'
    },
    {
      pattern: /window\.location\s*=|location\.href\s*=/gi,
      type: 'network' as const,
      severity: 'medium' as const,
      description: 'Page redirection - potential phishing',
      recommendation: 'Verify redirect destinations are legitimate'
    },
    {
      pattern: /crypto|btc|bitcoin|wallet|private.*key/gi,
      type: 'malware' as const,
      severity: 'high' as const,
      description: 'Cryptocurrency-related keywords - potential cryptojacking',
      recommendation: 'Review for unauthorized mining or wallet theft'
    },
    {
      pattern: /<iframe/gi,
      type: 'code-injection' as const,
      severity: 'medium' as const,
      description: 'iframe injection detected',
      recommendation: 'Verify iframe sources are trusted'
    },
    {
      pattern: /fromCharCode\s*\(\s*[\d\s,]+\)/gi,
      type: 'obfuscation' as const,
      severity: 'low' as const,
      description: 'Character code obfuscation detected',
      recommendation: 'Decode to inspect actual string content'
    },
    {
      pattern: /String\.fromCharCode\.apply/gi,
      type: 'obfuscation' as const,
      severity: 'medium' as const,
      description: 'Advanced string obfuscation - may hide malicious code',
      recommendation: 'Decode all obfuscated strings'
    },
    {
      pattern: /\\x[0-9a-f]{2}/gi,
      type: 'obfuscation' as const,
      severity: 'low' as const,
      description: 'Hex-encoded strings detected',
      recommendation: 'Decode hex strings to verify content'
    },
    {
      pattern: /\\u[0-9a-f]{4}/gi,
      type: 'obfuscation' as const,
      severity: 'low' as const,
      description: 'Unicode-encoded strings detected',
      recommendation: 'Decode unicode strings to verify content'
    },
    {
      pattern: /ActiveXObject/gi,
      type: 'malware' as const,
      severity: 'critical' as const,
      description: 'ActiveX usage - potential system compromise (IE only)',
      recommendation: 'Remove ActiveX usage immediately'
    },
    {
      pattern: /\.createElement\s*\(\s*['"`]script['"`]/gi,
      type: 'code-injection' as const,
      severity: 'high' as const,
      description: 'Dynamic script tag creation',
      recommendation: 'Verify dynamically loaded scripts are from trusted sources'
    },
    {
      pattern: /navigator\.sendBeacon/gi,
      type: 'data-exfiltration' as const,
      severity: 'medium' as const,
      description: 'Beacon API - potential data exfiltration',
      recommendation: 'Check beacon endpoints for legitimacy'
    }
  ];

  /**
   * Highly obfuscated code indicators
   */
  private static readonly OBFUSCATION_INDICATORS = [
    {
      pattern: /[\[\]()!+]{50,}/g,
      type: 'obfuscation' as const,
      severity: 'medium' as const,
      description: 'JSFuck obfuscation detected',
      recommendation: 'Decode using JSFuck decoder'
    },
    {
      pattern: /ﾟωﾟﾉ|ﾟΘﾟ/g,
      type: 'obfuscation' as const,
      severity: 'low' as const,
      description: 'AAEncode obfuscation detected',
      recommendation: 'Decode using AAEncode decoder'
    },
    {
      pattern: /\$=~\[\];.*\$\.\$_/g,
      type: 'obfuscation' as const,
      severity: 'low' as const,
      description: 'JJEncode obfuscation detected',
      recommendation: 'Decode using JJEncode decoder'
    },
    {
      pattern: /_0x[a-f0-9]{4,}/gi,
      type: 'obfuscation' as const,
      severity: 'medium' as const,
      description: 'Heavy variable name obfuscation detected',
      recommendation: 'Consider this code potentially malicious until decoded'
    }
  ];

  /**
   * Scan code for malware and dangerous patterns
   */
  static scanCode(code: string): SecurityScanResult {
    const threats: SecurityThreat[] = [];
    let score = 100;

    // Check malware patterns
    this.MALWARE_PATTERNS.forEach(({ pattern, type, severity, description, recommendation }) => {
      const matches = code.match(pattern);
      if (matches) {
        const lines = this.findLineNumbers(code, pattern);
        lines.forEach(line => {
          threats.push({
            type,
            severity,
            description: `${description} (found ${matches.length} occurrence${matches.length > 1 ? 's' : ''})`,
            pattern: pattern.source,
            line,
            recommendation
          });
        });
        score -= severity === 'critical' ? 30 : severity === 'high' ? 20 : severity === 'medium' ? 10 : 5;
      }
    });

    // Check dangerous patterns
    this.DANGEROUS_PATTERNS.forEach(({ pattern, type, severity, description, recommendation }) => {
      const matches = code.match(pattern);
      if (matches) {
        const lines = this.findLineNumbers(code, pattern);
        lines.forEach(line => {
          threats.push({
            type,
            severity,
            description: `${description} (found ${matches.length} occurrence${matches.length > 1 ? 's' : ''})`,
            pattern: pattern.source,
            line,
            recommendation
          });
        });
        score -= severity === 'critical' ? 25 : severity === 'high' ? 15 : severity === 'medium' ? 8 : 3;
      }
    });

    // Check obfuscation indicators
    this.OBFUSCATION_INDICATORS.forEach(({ pattern, type, severity, description, recommendation }) => {
      const matches = code.match(pattern);
      if (matches) {
        threats.push({
          type,
          severity,
          description,
          pattern: pattern.source,
          recommendation
        });
        score -= severity === 'medium' ? 15 : 10;
      }
    });

    score = Math.max(0, Math.min(100, score));

    const threatLevel = this.calculateThreatLevel(score, threats);

    return {
      isSafe: score >= 70 && !threats.some(t => t.severity === 'critical'),
      threatLevel,
      threats,
      score
    };
  }

  /**
   * Find line numbers where pattern matches
   */
  private static findLineNumbers(code: string, pattern: RegExp): number[] {
    const lines: number[] = [];
    const codeLines = code.split('\n');
    
    codeLines.forEach((line, index) => {
      if (pattern.test(line)) {
        lines.push(index + 1);
      }
    });

    return lines.length > 0 ? lines : [0];
  }

  /**
   * Calculate overall threat level
   */
  private static calculateThreatLevel(score: number, threats: SecurityThreat[]): 'safe' | 'low' | 'medium' | 'high' | 'critical' {
    const hasCritical = threats.some(t => t.severity === 'critical');
    const hasHigh = threats.some(t => t.severity === 'high');
    
    if (hasCritical || score < 30) return 'critical';
    if (hasHigh || score < 50) return 'high';
    if (score < 70) return 'medium';
    if (score < 90) return 'low';
    return 'safe';
  }

  /**
   * Get human-readable threat level description
   */
  static getThreatLevelDescription(level: string): string {
    const descriptions: Record<string, string> = {
      safe: '✅ Safe - No significant threats detected',
      low: '⚠️ Low Risk - Minor concerns found',
      medium: '⚠️ Medium Risk - Potentially dangerous patterns detected',
      high: '🚨 High Risk - Dangerous code detected',
      critical: '🔴 Critical Risk - Malware patterns detected'
    };
    return descriptions[level] || descriptions.safe;
  }

  /**
   * Get color for threat level
   */
  static getThreatLevelColor(level: string): string {
    const colors: Record<string, string> = {
      safe: '#4caf50',
      low: '#ff9800',
      medium: '#ff9800',
      high: '#f44336',
      critical: '#d32f2f'
    };
    return colors[level] || colors.safe;
  }
}
