// utils/isPWAInstalled.test.ts
import { isPWAInstalled } from '../../utils/isPWAInstalled';
import { describe, it, expect, vi } from 'vitest';

// JSDOM을 사용하여 window 객체의 matchMedia 및 navigator를 모킹합니다.
describe('isPWAInstalled() 동작함수', () => {
  it('PWA가 standalone 모드일때 true', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => {
      return {
        matches: query === '(display-mode: standalone)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });

    expect(isPWAInstalled()).toBe(true);
  });

  it('userAgent에 TWA 문자열이 있을 때 True 반환', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Linux; Android 10; TWA) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36',
      configurable: true,
    });

    expect(isPWAInstalled()).toBe(true);
  });

  it('PWA나 TWA가 아닐때 False 반환', () => {
    // 기본적으로 matchMedia가 false를 반환하도록 설정
    window.matchMedia = vi.fn().mockImplementation(() => {
      return {
        matches: false,
        media: '',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });

    // navigator.userAgent를 일반적인 브라우저 문자열로 설정
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      configurable: true,
    });

    expect(isPWAInstalled()).toBe(false);
  });
});
