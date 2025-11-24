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
  customVars: string;
  beautify: string;
  minify: string;
  download: string;
  layersDetected: string;
  autoDecodeAll: string;
  compareMode: string;
  renameVars: string;
  decodeStrings: string;
  customTemplate: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    title: 'JS Decoder',
    decode: 'Decode',
    encode: 'Encode',
    clear: 'Clear',
    loadExample: 'Load Example',
    inputPlaceholder: 'Paste your eval-packed code here...',
    outputPlaceholder: 'Result will appear here...',
    errorPrefix: 'Error: ',
    copyrightText: '\u00a9 2025 Murr',
    toggleTheme: 'Toggle Theme',
    base62Encode: 'Base62 Encoding',
    simpleCompress: 'Simple Compression',
    copy: 'Copy',
    paste: 'Paste',
    copied: 'Copied!',
    customVars: 'Custom Vars (m,u,r,r)',
    beautify: 'Beautify',
    minify: 'Minify',
    download: 'Download',
    layersDetected: 'Layers',
    autoDecodeAll: 'Auto-Decode All',
    compareMode: 'Compare',
    renameVars: 'Rename Vars',
    decodeStrings: 'Decode Strings',
    customTemplate: 'Custom Template',
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
    customVars: 'Свои переменные (m,u,r,r)',
    beautify: 'Форматировать',
    minify: 'Сжать',
    download: 'Скачать',
    layersDetected: 'Слоёв',
    autoDecodeAll: 'Авто-декодировать всё',
    compareMode: 'Сравнить',
    renameVars: 'Переименовать',
    decodeStrings: 'Декодировать строки',
    customTemplate: 'Свой шаблон',
  },
  de: {
    title: 'JS Decoder',
    decode: 'Dekodieren',
    encode: 'Kodieren',
    clear: 'L\u00f6schen',
    loadExample: 'Beispiel laden',
    inputPlaceholder: 'F\u00fcgen Sie Ihren verpackten Code hier ein...',
    outputPlaceholder: 'Das Ergebnis wird hier angezeigt...',
    errorPrefix: 'Fehler: ',
    copyrightText: '\u00a9 2025 Murr',
    toggleTheme: 'Thema wechseln',
    base62Encode: 'Base62-Kodierung',
    simpleCompress: 'Einfache Kompression',
    copy: 'Kopieren',
    paste: 'Einf\u00fcgen',
    copied: 'Kopiert!',
    customVars: 'Eigene Variablen (m,u,r,r)',
    beautify: 'Formatieren',
    minify: 'Minimieren',
    download: 'Herunterladen',
    layersDetected: 'Ebenen',
    autoDecodeAll: 'Auto-Dekodieren',
    compareMode: 'Vergleichen',
    renameVars: 'Vars umbenennen',
    decodeStrings: 'Strings dekodieren',
    customTemplate: 'Eigene Vorlage',
  },
};

export const getTranslation = (lang: Language): Translations => {
  return translations[lang];
};
