export type Language = 'en' | 'ru' | 'de';

export interface Translations {
  title: string;
  decode: string;
  encode: string;
  clear: string;
  loadExample: string;
  inputPlaceholder: string;
  outputPlaceholder: string;
  errorPrefix: string;
  copyrightText: string;
  toggleTheme: string;
  base62Encode: string;
  simpleCompress: string;
  copy: string;
  paste: string;
  copied: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    title: 'JS Decoder / Encoder',
    decode: 'Decode',
    encode: 'Encode',
    clear: 'Clear',
    loadExample: 'Load Example',
    inputPlaceholder: 'Paste your eval-packed code here...',
    outputPlaceholder: 'Result will appear here...',
    errorPrefix: 'Error: ',
    copyrightText: '© 2025 Murr',
    toggleTheme: 'Toggle Theme',
    base62Encode: 'Base62 Encoding',
    simpleCompress: 'Simple Compression',
    copy: 'Copy',
    paste: 'Paste',
    copied: 'Copied!',
  },
  ru: {
    title: 'JS Декодер / Кодер',
    decode: 'Декодировать',
    encode: 'Кодировать',
    clear: 'Очистить',
    loadExample: 'Загрузить пример',
    inputPlaceholder: 'Вставьте ваш упакованный код здесь...',
    outputPlaceholder: 'Результат появится здесь...',
    errorPrefix: 'Ошибка: ',
    copyrightText: '© 2025 Murr',
    toggleTheme: 'Сменить тему',
    base62Encode: 'Base62 кодирование',
    simpleCompress: 'Простое сжатие',
    copy: 'Копировать',
    paste: 'Вставить',
    copied: 'Скопировано!',
  },
  de: {
    title: 'JS Decoder / Encoder',
    decode: 'Dekodieren',
    encode: 'Kodieren',
    clear: 'Löschen',
    loadExample: 'Beispiel laden',
    inputPlaceholder: 'Fügen Sie Ihren verpackten Code hier ein...',
    outputPlaceholder: 'Das Ergebnis wird hier angezeigt...',
    errorPrefix: 'Fehler: ',
    copyrightText: '© 2025 Murr',
    toggleTheme: 'Thema wechseln',
    base62Encode: 'Base62-Kodierung',
    simpleCompress: 'Einfache Kompression',
    copy: 'Kopieren',
    paste: 'Einfügen',
    copied: 'Kopiert!',
  },
};

export const getTranslation = (lang: Language): Translations => {
  return translations[lang];
};
