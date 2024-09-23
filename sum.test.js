import { expect, test } from 'vitest';
import { sum } from './sum.js';

test('adds 1+2 to equaul 3', () => {
  expect(sum(1, 2)).toBe(3);
});
