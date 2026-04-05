import { useMemo, useState } from 'react';

import { findDuplicateMatch } from '../domain/matchers';
import { normalizeDoi, normalizeIsbn, normalizeUrl } from '../domain/normalize';
import type { DuplicateMatch, Reference } from '../domain/types';

export interface DuplicateCheckState {
  url: string;
  doi: string;
  isbn: string;
  normalizedUrl: string | null;
  normalizedDoi: string | null;
  normalizedIsbn: string | null;
  hasAnyInput: boolean;
  match: DuplicateMatch | null;
  setUrl: (value: string) => void;
  setDoi: (value: string) => void;
  setIsbn: (value: string) => void;
}

export function useDuplicateCheck(references: Reference[]): DuplicateCheckState {
  const [url, setUrl] = useState('');
  const [doi, setDoi] = useState('');
  const [isbn, setIsbn] = useState('');

  const normalizedUrl = useMemo(() => normalizeUrl(url), [url]);
  const normalizedDoi = useMemo(() => normalizeDoi(doi), [doi]);
  const normalizedIsbn = useMemo(() => normalizeIsbn(isbn), [isbn]);

  const hasAnyInput = useMemo(
    () => [url, doi, isbn].some((value) => value.trim().length > 0),
    [url, doi, isbn],
  );

  const match = useMemo(() => {
    if (!hasAnyInput) return null;

    return findDuplicateMatch(
      {
        url,
        doi,
        isbn,
      },
      references,
    );
  }, [doi, hasAnyInput, isbn, references, url]);

  return {
    url,
    doi,
    isbn,
    normalizedUrl,
    normalizedDoi,
    normalizedIsbn,
    hasAnyInput,
    match,
    setUrl,
    setDoi,
    setIsbn,
  };
}
