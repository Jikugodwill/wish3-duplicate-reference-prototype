import { describe, expect, it } from 'vitest';

import { normalizeDoi, normalizeIsbn, normalizeUrl } from './normalize';

describe('normalizeUrl', () => {
  it('normalizes host casing and trims trailing slash', () => {
    const input = 'https://WWW.Example.com/Some/Path/';
    expect(normalizeUrl(input)).toBe('https://example.com/Some/Path');
  });
});

describe('normalizeDoi', () => {
  it('normalizes DOI when provided as doi.org URL', () => {
    const input = 'https://doi.org/10.1038/S41562-023-01562-0';
    expect(normalizeDoi(input)).toBe('10.1038/s41562-023-01562-0');
  });
});

describe('normalizeIsbn', () => {
  it('normalizes ISBN with spaces and hyphens', () => {
    const input = 'ISBN 978-0 13-110362-7';
    expect(normalizeIsbn(input)).toBe('9780131103627');
  });
});
