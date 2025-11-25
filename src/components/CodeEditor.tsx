/**
 * Code Editor Component with Monaco Editor
 * © 2025 Murr | https://github.com/vtstv
 */

import { Editor } from '@monaco-editor/react';
import { Theme } from '../theme/theme';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  theme: Theme;
  readOnly?: boolean;
  language?: string;
  placeholder?: string;
  height?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  theme,
  readOnly = false,
  language = 'javascript',
  height = '400px'
}) => {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  const editorTheme = theme.background === '#0d1117' ? 'vs-dark' : 'light';

  return (
    <Editor
      height={height}
      defaultLanguage={language}
      value={value}
      onChange={handleEditorChange}
      theme={editorTheme}
      options={{
        readOnly,
        minimap: { enabled: true },
        fontSize: 14,
        lineNumbers: 'on',
        glyphMargin: true,
        folding: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 4,
        renderLineHighlight: 'all',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: 'on',
        wrappingIndent: 'indent',
        padding: { top: 10, bottom: 10 },
        quickSuggestions: {
          other: true,
          comments: false,
          strings: false
        }
      }}
    />
  );
};
