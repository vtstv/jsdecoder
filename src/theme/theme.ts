export interface Theme {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryHover: string;
  border: string;
  shadow: string;
  error: string;
}

export const darkTheme: Theme = {
  background: '#0d1117',
  surface: '#161b22',
  text: '#c9d1d9',
  textSecondary: '#8b949e',
  primary: '#58a6ff',
  primaryHover: '#1f6feb',
  border: '#30363d',
  shadow: 'rgba(0, 0, 0, 0.5)',
  error: '#f85149',
};

export const lightTheme: Theme = {
  background: '#ffffff',
  surface: '#f6f8fa',
  text: '#24292f',
  textSecondary: '#57606a',
  primary: '#0969da',
  primaryHover: '#0550ae',
  border: '#d0d7de',
  shadow: 'rgba(0, 0, 0, 0.1)',
  error: '#d1242f',
};
