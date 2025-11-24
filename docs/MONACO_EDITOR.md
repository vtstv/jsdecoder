# Monaco Editor Guide

## Overview
Monaco Editor is the same powerful code editor that powers Visual Studio Code, now integrated into JS Code Deobfuscator/Obfuscator.

## How to Enable

1. Find the **"Use Advanced Editor"** checkbox (📝 icon)
2. Check the box to enable Monaco Editor
3. Your code will now be displayed in the advanced editor

## Features

### ✨ Syntax Highlighting
- JavaScript syntax is automatically colored
- Keywords, strings, comments, operators highlighted
- Makes code much easier to read

### 🔢 Line Numbers
- Automatic line numbers on the left
- Easy reference for error locations
- Perfect for security scan results

### 🗺️ Code Minimap
- Small overview of entire code on the right
- Quick navigation in long files
- See code structure at a glance

### 📁 Code Folding
- Collapse/expand functions and blocks
- Click the `-` or `+` icons in the gutter
- Focus on specific code sections

### 💡 IntelliSense
- Basic auto-completion as you type
- JavaScript keywords and common patterns
- Press `Ctrl+Space` for suggestions

### 🔍 Find & Replace
- Press `Ctrl+F` to search in code
- Press `Ctrl+H` for find & replace
- Supports regex patterns

### ⌨️ Multi-Cursor Editing
- Hold `Alt` and click to add cursors
- Edit multiple lines at once
- Press `Ctrl+Alt+Down` for cursor below

### 🎨 Theme Support
- Automatically matches app theme
- Light theme in light mode
- Dark theme (`vs-dark`) in dark mode

## Keyboard Shortcuts

### Essential
- `Ctrl+F` - Find in code
- `Ctrl+H` - Find and replace
- `Ctrl+/` - Toggle line comment
- `Ctrl+]` - Indent line
- `Ctrl+[` - Outdent line
- `Ctrl+Shift+K` - Delete line

### Selection
- `Ctrl+D` - Select next occurrence
- `Ctrl+Shift+L` - Select all occurrences
- `Alt+Click` - Add cursor
- `Ctrl+Alt+Down` - Add cursor below

### Navigation
- `Ctrl+G` - Go to line
- `Ctrl+Home` - Go to file start
- `Ctrl+End` - Go to file end
- `Ctrl+Left/Right` - Jump by word

### Formatting
- `Shift+Alt+F` - Format document
- `Ctrl+K Ctrl+F` - Format selection

## Use Cases

### 🔍 Analyzing Obfuscated Code
**Why Monaco?**
- Line numbers help track security threats
- Code folding hides long obfuscated blocks
- Syntax highlighting shows code structure

**Example:**
```javascript
// Before Monaco: Unreadable wall of text
function _0x1234(){var _0x5678=["\x48\x65\x6C\x6C\x6F"];...}

// With Monaco: Formatted, highlighted, foldable
function _0x1234() {
  var _0x5678 = ["\x48\x65\x6C\x6C\x6F"]; // Collapsed!
  // ...
}
```

### 🛡️ Security Scanning
**Why Monaco?**
- Security panel shows line numbers
- Jump directly to threat location
- Visual markers in the gutter

**Example:**
```
Security Scan: Line 42 - eval(atob(...))
↓
Click line 42 → Editor scrolls to threat
```

### ✏️ Writing Code
**Why Monaco?**
- Auto-completion speeds up typing
- Syntax errors highlighted in red
- Bracket matching prevents errors

### 📊 Compare Mode
**Why Monaco?**
- Side-by-side editors with same features
- Easy to spot differences
- Both panels have line numbers

### ✂️ Split View Mode
**Why Monaco?**
- Input and Output both get Monaco features
- Copy code easily with minimap navigation
- Track transformations line by line

## Performance

### When to Use
✅ **Large files** (Monaco handles big code better)  
✅ **Security analysis** (line numbers essential)  
✅ **Code review** (syntax highlighting helps)  
✅ **Professional work** (full IDE experience)

### When to Disable
❌ **Slow devices** (simple textarea is faster)  
❌ **Quick tests** (extra features not needed)  
❌ **Simple transformations** (basic editor sufficient)

## Comparison: Monaco vs Textarea

| Feature | Monaco Editor | Basic Textarea |
|---------|---------------|----------------|
| Line Numbers | ✅ Yes | ❌ No |
| Syntax Highlighting | ✅ Yes | ❌ No |
| Code Folding | ✅ Yes | ❌ No |
| IntelliSense | ✅ Yes | ❌ No |
| Minimap | ✅ Yes | ❌ No |
| Find & Replace | ✅ Advanced | ⚠️ Basic (browser) |
| Multi-Cursor | ✅ Yes | ❌ No |
| Performance | ⚠️ Good | ✅ Excellent |
| Bundle Size | ⚠️ +31 KB | ✅ 0 KB |
| Load Time | ⚠️ ~300ms | ✅ Instant |

## Tips & Tricks

### 1. Jump to Line from Security Scan
```
Security report says: "Line 84 - dangerous pattern"
→ Press Ctrl+G
→ Type 84
→ Press Enter
→ Cursor jumps to line 84!
```

### 2. Format Minified Code
```javascript
// Paste minified code
var a=1;function b(){return a+2;}var c=b();

// Press Shift+Alt+F
var a = 1;
function b() {
  return a + 2;
}
var c = b();
```

### 3. Collapse Long Blocks
```javascript
// Click the '-' icon next to line 1
function hugeFunctionWithLotsOfCode() {
  // ... 500 lines ...
}

// Becomes:
function hugeFunctionWithLotsOfCode() {...} // Collapsed!
```

### 4. Select All Occurrences
```javascript
// Want to rename '_0x1234' everywhere?
// Double-click _0x1234
// Press Ctrl+Shift+L
// Type new name → all instances change!
```

### 5. Multi-Line Editing
```javascript
// Want to add '//' to multiple lines?
// Hold Alt, click at start of each line
// Type '//' → appears on all lines!
```

## Troubleshooting

### Monaco is Slow
- Disable minimap (smaller files)
- Use basic textarea for quick edits
- Update your browser

### Can't See Line Numbers
- Make sure Monaco is enabled (checkbox checked)
- Line numbers are on by default in Monaco
- If using textarea, switch to Monaco

### Keyboard Shortcuts Don't Work
- Make sure cursor is in the editor
- Some shortcuts may conflict with browser
- Try clicking in the editor first

### Editor is Too Small
- Monaco auto-resizes to 500px height
- In Split View, each panel is 400px
- Scroll inside the editor if needed

## Advanced Configuration

The Monaco Editor is pre-configured with optimal settings:

```typescript
{
  lineNumbers: 'on',        // Always show line numbers
  minimap: { enabled: true }, // Code overview on right
  folding: true,            // Enable code folding
  glyphMargin: true,        // Space for icons/breakpoints
  renderLineHighlight: 'all', // Highlight current line
  automaticLayout: true,    // Auto-resize on window change
  wordWrap: 'on',          // Wrap long lines
  scrollBeyondLastLine: false, // No extra scroll space
  quickSuggestions: true,  // IntelliSense enabled
  fontSize: 14,            // Readable font size
  language: 'javascript'   // JS syntax highlighting
}
```

## Browser Compatibility

✅ **Fully Supported**:
- Chrome 90+ (recommended)
- Edge 90+
- Firefox 88+
- Safari 15+

⚠️ **Limited Support**:
- Older browsers (may be slow)
- Mobile browsers (use with caution)

## Resources

- [Monaco Editor Official Docs](https://microsoft.github.io/monaco-editor/)
- [VS Code Keyboard Shortcuts](https://code.visualstudio.com/docs/getstarted/keybindings)
- [Monaco Playground](https://microsoft.github.io/monaco-editor/playground.html)

---

**Pro Tip**: Monaco Editor is optional! Use it when you need advanced features, disable it for quick edits. Toggle anytime with the checkbox.
