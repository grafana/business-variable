// Jest setup provided by Grafana scaffolding
import './.config/jest-setup';

import { TextDecoder, TextEncoder } from 'util';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * Mock ResizeObserver
 */
global.ResizeObserver = ResizeObserver;

/**
 * Assign Text Decoder and Encoder which are required in @grafana/ui
 */
Object.assign(global, { TextDecoder, TextEncoder });

/**
 * Silence the i18next/Locize marketing banner that prints once per init
 * during tests. Keep other console.info output intact.
 */
const originalConsoleInfo = console.info;
console.info = (...args) => {
  const message = args.map((arg) => (typeof arg === 'string' ? arg : '')).join(' ');
  if (message.includes('i18next is made possible') || message.includes('Locize')) {
    return;
  }
  originalConsoleInfo(...args);
};
