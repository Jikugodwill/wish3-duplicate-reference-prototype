import { describe, expect, it } from 'vitest';

import { findDuplicateMatch } from './matchers';
import type { Reference } from './types';

const references: Reference[] = [
  {
    id: 'ref-url',
    title: 'URL Reference',
    url: 'https://en.wikipedia.org/wiki/Help:Citing_sources',
  },
  {
    id: 'ref-doi',
    title: 'DOI Reference',
    doi: '10.1038/s41562-023-01562-0',
  },
  {
    id: 'ref-isbn',
    title: 'ISBN Reference',
    isbn: '978-0-13-110362-7',
  },
];

describe('findDuplicateMatch', () => {
  it('detects URL duplicates after normalization', () => {
    const match = findDuplicateMatch(
      {
        url: 'https://EN.WIKIPEDIA.ORG/wiki/Help:Citing_sources/',
      },
      references,
    );

    expect(match.found).toBe(true);
    expect(match.matchType).toBe('url');
    expect(match.matchedReference?.id).toBe('ref-url');
  });

  it('detects DOI duplicates with doi.org prefix', () => {
    const match = findDuplicateMatch(
      {
        doi: 'https://doi.org/10.1038/S41562-023-01562-0',
      },
      references,
    );

    expect(match.found).toBe(true);
    expect(match.matchType).toBe('doi');
    expect(match.matchedReference?.id).toBe('ref-doi');
  });

  it('detects ISBN duplicates with spaces and hyphens', () => {
    const match = findDuplicateMatch(
      {
        isbn: 'ISBN 978 0-13-110362-7',
      },
      references,
    );

    expect(match.found).toBe(true);
    expect(match.matchType).toBe('isbn');
    expect(match.matchedReference?.id).toBe('ref-isbn');
  });

  it('returns no match when identifiers are not present in references', () => {
    const match = findDuplicateMatch(
      {
        doi: '10.1000/xyz123',
        isbn: '9780306406157',
        url: 'https://example.org/missing',
      },
      references,
    );

    expect(match.found).toBe(false);
    expect(match.matchType).toBeNull();
    expect(match.matchedReference).toBeNull();
  });
});
