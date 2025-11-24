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
  splitMode: string;
  input: string;
  output: string;
  renameVars: string;
  decodeStrings: string;
  customTemplate: string;
  decodeJSFuck: string;
  decodeAAEncode: string;
  decodeJJEncode: string;
  decodeURL: string;
  decodeBase64: string;
  decodeHex: string;
  decodeUnicode: string;
  unpackArray: string;
  smartDecode: string;
  encodeAAEncode: string;
  encodeJJEncode: string;
  encodeHex: string;
  encodeUnicode: string;
  encodeURL: string;
  encodeBase64: string;
  obfuscateAdvanced: string;
  // Dropdown labels
  deobfuscation: string;
  obfuscation: string;
  run: string;
  encodeMurrCoder: string;
  // Security
  securityScan: string;
  useMonaco: string;
  // Disclaimer
  disclaimer: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    title: 'JS Code Deobfuscator / Obfuscator',
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
    splitMode: 'Split View',
    input: 'Input',
    output: 'Output',
    renameVars: 'Rename Vars',
    decodeStrings: 'Decode Strings',
    customTemplate: 'Custom Template',
    decodeJSFuck: 'Decode JSFuck',
    decodeAAEncode: 'Decode AAEncode',
    decodeJJEncode: 'Decode JJEncode',
    decodeURL: 'Decode URL',
    decodeBase64: 'Decode Base64',
    decodeHex: 'Decode Hex',
    decodeUnicode: 'Decode Unicode',
    unpackArray: 'Unpack Array',
    smartDecode: 'Smart Decode',
    encodeAAEncode: 'Encode AAEncode',
    encodeJJEncode: 'Encode JJEncode',
    encodeHex: 'Encode Hex',
    encodeUnicode: 'Encode Unicode',
    encodeURL: 'Encode URL',
    encodeBase64: 'Encode Base64',
    obfuscateAdvanced: 'MurrCoder (Advanced)',
    // Dropdown labels
    deobfuscation: 'Deobfuscation',
    obfuscation: 'Obfuscation',
    run: 'Run',
    encodeMurrCoder: 'MurrCoder (Extreme)',
    // Security
    securityScan: '🔒 Security Scan',
    useMonaco: 'Use Advanced Editor',
    // Disclaimer
    disclaimer: 'Note: This tool may not decrypt some multi-layered encodings and MurrCoder methods. Always verify code functionality before use.',
  },
  ru: {
    title: 'JS Code Деобфускатор / Обфускатор',
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
    splitMode: 'Разделить',
    input: 'Ввод',
    output: 'Вывод',
    renameVars: 'Переименовать',
    decodeStrings: 'Декодировать строки',
    customTemplate: 'Свой шаблон',
    // New deobfuscation methods
    decodeJSFuck: 'Декодировать JSFuck',
    decodeAAEncode: 'Декодировать AAEncode',
    decodeJJEncode: 'Декодировать JJEncode',
    decodeURL: 'Декодировать URL',
    decodeBase64: 'Декодировать Base64',
    decodeHex: 'Декодировать Hex',
    decodeUnicode: 'Декодировать Unicode',
    unpackArray: 'Распаковать массив',
    smartDecode: 'Умное декодирование',
    encodeAAEncode: 'Кодировать AAEncode',
    encodeJJEncode: 'Кодировать JJEncode',
    encodeHex: 'Кодировать Hex',
    encodeUnicode: 'Кодировать Unicode',
    encodeURL: 'Кодировать URL',
    encodeBase64: 'Кодировать Base64',
    obfuscateAdvanced: 'MurrCoder (Продвинутый)',
    // Dropdown labels
    deobfuscation: 'Деобфускация',
    obfuscation: 'Обфускация',
    run: 'Выполнить',
    encodeMurrCoder: 'MurrCoder (Экстремальный)',
    // Security
    securityScan: '🔒 Проверка безопасности',
    useMonaco: 'Расширенный редактор',
    // Disclaimer
    disclaimer: 'Примечание: Этот инструмент может не расшифровать некоторые многослойные кодировки и методы MurrCoder. Всегда проверяйте функциональность кода перед использованием.',
  },
  de: {
    title: 'JS Code Deobfuscator / Obfuscator',
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
    splitMode: 'Geteilte Ansicht',
    input: 'Eingabe',
    output: 'Ausgabe',
    renameVars: 'Vars umbenennen',
    decodeStrings: 'Strings dekodieren',
    customTemplate: 'Eigene Vorlage',
    decodeJSFuck: 'JSFuck dekodieren',
    decodeAAEncode: 'AAEncode dekodieren',
    decodeJJEncode: 'JJEncode dekodieren',
    decodeURL: 'URL dekodieren',
    decodeBase64: 'Base64 dekodieren',
    decodeHex: 'Hex dekodieren',
    decodeUnicode: 'Unicode dekodieren',
    unpackArray: 'Array entpacken',
    smartDecode: 'Intelligentes Dekodieren',
    encodeAAEncode: 'AAEncode kodieren',
    encodeJJEncode: 'JJEncode kodieren',
    encodeHex: 'Hex kodieren',
    encodeUnicode: 'Unicode kodieren',
    encodeURL: 'URL kodieren',
    encodeBase64: 'Base64 kodieren',
    obfuscateAdvanced: 'MurrCoder (Erweitert)',
    // Dropdown labels
    deobfuscation: 'Entschlüsselung',
    obfuscation: 'Verschleierung',
    run: 'Ausführen',
    encodeMurrCoder: 'MurrCoder (Extrem)',
    // Security
    securityScan: '🔒 Sicherheitsüberprüfung',
    useMonaco: 'Erweiterter Editor',
    // Disclaimer
    disclaimer: 'Hinweis: Dieses Tool kann einige mehrschichtige Codierungen und MurrCoder-Methoden möglicherweise nicht entschlüsseln. Überprüfen Sie immer die Funktionalität des Codes vor der Verwendung.',
  },
};

export const getTranslation = (lang: Language): Translations => {
  return translations[lang];
};
