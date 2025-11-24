import { DiffEditor as MonacoDiffEditor } from '@monaco-editor/react';
import { Theme } from '../theme/theme';

interface DiffEditorProps {
  original: string;
  modified: string;
  theme: Theme;
  height?: string;
}

export function DiffEditor({ original, modified, theme, height = '600px' }: DiffEditorProps) {
  const monacoTheme = theme.background === '#0d1117' ? 'vs-dark' : 'light';

  return (
    <div style={{ border: `1px solid ${theme.border}`, borderRadius: '8px', overflow: 'hidden' }}>
      <MonacoDiffEditor
        height={height}
        language="javascript"
        original={original}
        modified={modified}
        theme={monacoTheme}
        options={{
          readOnly: true,
          renderSideBySide: true,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: 'on',
          renderOverviewRuler: true,
          wordWrap: 'off',
          folding: true,
          glyphMargin: false,
          enableSplitViewResizing: true,
          renderIndicators: true,
          originalEditable: false,
        }}
      />
    </div>
  );
}
