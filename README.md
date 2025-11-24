# JS Code Deobfuscator / Obfuscator

<img width="1995" height="1091" alt="image" src="https://github.com/user-attachments/assets/32a9f43e-293b-4b00-9a10-0c0c89277021" />

A powerful React TypeScript application for deobfuscating, obfuscating, and analyzing JavaScript code with advanced security scanning.

## ✨ Features

### 🔓 Deobfuscation
- **Smart Decode**: Auto-detects and decodes multiple obfuscation types
- **JSFuck**: Decode JSFuck obfuscated code (only []()!+ characters)
- **AAEncode**: Decode Japanese emoticon-based encoding
- **JJEncode**: Decode symbol-based encoding
- **Base64, URL, Hex, Unicode**: Standard encoding formats
- **Array Unpacking**: Unpack array-based obfuscation

### 🔒 Obfuscation
- **MurrCoder (Extreme)**: Custom extreme obfuscation with char code arrays and mathematical operations
- **MurrCoder (Advanced)**: Advanced obfuscation with string encoding and variable renaming
- **AAEncode, JJEncode**: Japanese and symbol-based encoding
- **Hex, Unicode, URL, Base64**: Standard encoding methods

### 🛡️ Security Features
- **🔒 Malware Scanner**: Detects malicious patterns in JavaScript code
  - Identifies base64-encoded eval execution
  - Detects dynamic script injection
  - Finds suspicious function constructors
  - Recognizes cryptocurrency-related code
  - Detects data exfiltration attempts
  
- **⚠️ Dangerous Pattern Detection**:
  - Network requests (XMLHttpRequest, fetch, WebSocket)
  - Cookie and localStorage access
  - innerHTML manipulation (XSS vulnerabilities)
  - Page redirections
  - iframe injections
  - ActiveX usage (IE exploits)
  
- **Security Score**: 0-100 rating with threat level classification
- **Detailed Threat Reports**: Line numbers, severity, and recommendations

### 💻 Advanced Code Editor
- **Monaco Editor Integration**: VS Code-like editing experience
  - Syntax highlighting
  - **Line numbers**
  - Code folding
  - Minimap navigation
  - IntelliSense suggestions
  - Auto-indentation
  - Multiple cursors
  
- **Fallback Mode**: Classic textarea for lightweight editing

### 🎨 UI Features
- **Split View Mode**: Separate input/output panels for better workflow
- **Compare Mode**: Side-by-side original vs decoded code
- **Multi-language**: English, Russian, German
- **Dark/Light Theme**: Toggle between themes
- **Copy/Paste/Download**: Easy code management
- **Eval Layer Detection**: Shows how many layers of eval() wrapping

### 🔧 Code Tools
- **Beautify**: Format and prettify JavaScript code
- **Minify**: Compress code by removing whitespace
- **Rename Variables**: Obfuscate variable names
- **Decode Strings**: Decode hex/unicode encoded strings
- **Run Code**: Execute code directly in the browser

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

### Build for Production

```bash
npm run build
```

The compiled static files will be in the `dist/` folder, ready for deployment to any static hosting service.

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # React components
│   ├── CodeEditor.tsx  # Monaco Editor wrapper
│   └── SecurityPanel.tsx # Security scan results UI
├── hooks/              # Custom React hooks
│   ├── useDeobfuscationHandlers.ts
│   ├── useObfuscationHandlers.ts
│   └── useUtilityHandlers.ts
├── utils/              # Core functionality
│   ├── codeTransformer.ts  # Main transformation logic
│   ├── encoders.ts         # Encoding methods
│   ├── decoders.ts         # Decoding methods
│   └── securityScanner.ts  # Security analysis
├── i18n/               # Internationalization
│   └── translations.ts
└── theme/              # UI themes
    └── theme.ts
```

### Technologies
- **React 18** with TypeScript
- **Vite** for fast builds
- **Monaco Editor** for advanced code editing
- **Emotion CSS** for styling
- Custom security scanner engine

## 🔒 Security Scanner Details

The built-in security scanner analyzes JavaScript code for:

1. **Malware Patterns** (Critical/High severity):
   - Base64 encoded eval() execution
   - Dynamic script injections
   - Function constructor usage
   - Cryptocurrency mining code

2. **Dangerous Patterns** (Medium/High severity):
   - Network communications
   - Cookie/storage access
   - DOM manipulation vulnerabilities
   - Page redirections

3. **Obfuscation Detection** (Low/Medium severity):
   - JSFuck, AAEncode, JJEncode
   - Heavy variable name obfuscation
   - String encoding patterns

Each threat includes:
- Severity level (Low/Medium/High/Critical)
- Line number location
- Detailed description
- Remediation recommendations

## ⚠️ Disclaimer

This tool is for educational and legitimate code analysis purposes only. Always verify code functionality and security before use in production. The tool may not decrypt all multi-layered encodings.

## 📝 Copyright

© 2025 Murr | [GitHub: vtstv](https://github.com/vtstv)
