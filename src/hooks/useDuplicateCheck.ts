import { useMemo, useState } from 'react';

import { findDuplicateMatch } from '../domain/matchers';
import { normalizeDoi, normalizeIsbn, normalizeUrl } from '../domain/normalize';
import type { DuplicateMatch, Reference } from '../domain/types';

export type IdentifierKey = 'url' | 'doi' | 'isbn';

type IdentifierValueMap = Record<IdentifierKey, string>;
type NormalizedValueMap = Record<IdentifierKey, string | null>;
type IdentifierMatchMap = Record<IdentifierKey, DuplicateMatch | null>;

export interface DuplicateCheckState {
  url: string;
  doi: string;
  isbn: string;
  normalizedUrl: string | null;
  normalizedDoi: string | null;
  normalizedIsbn: string | null;
  hasAnyInput: boolean;
  hasAnyDuplicate: boolean;
  valuesByIdentifier: IdentifierValueMap;
  normalizedByIdentifier: NormalizedValueMap;
  matchesByIdentifier: IdentifierMatchMap;
  setUrl: (value: string) => void;
  setDoi: (value: string) => void;
  setIsbn: (value: string) => void;
  resetInputs: () => void;
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

  const valuesByIdentifier = useMemo<IdentifierValueMap>(
    () => ({ url, doi, isbn }),
    [doi, isbn, url],
  );

  const normalizedByIdentifier = useMemo<NormalizedValueMap>(
    () => ({
      url: normalizedUrl,
      doi: normalizedDoi,
      isbn: normalizedIsbn,
    }),
    [normalizedDoi, normalizedIsbn, normalizedUrl],
  );

  const matchesByIdentifier = useMemo<IdentifierMatchMap>(
    () => ({
      url: url.trim() ? findDuplicateMatch({ url }, references) : null,
      doi: doi.trim() ? findDuplicateMatch({ doi }, references) : null,
      isbn: isbn.trim() ? findDuplicateMatch({ isbn }, references) : null,
    }),
    [doi, isbn, references, url],
  );

  const hasAnyDuplicate = useMemo(
    () => Object.values(matchesByIdentifier).some((match) => Boolean(match?.found)),
    [matchesByIdentifier],
  );

  const resetInputs = () => {
    setUrl('');
    setDoi('');
    setIsbn('');
  };

  return {
    url,
    doi,
    isbn,
    normalizedUrl,
    normalizedDoi,
    normalizedIsbn,
    hasAnyInput,
    hasAnyDuplicate,
    valuesByIdentifier,
    normalizedByIdentifier,
    matchesByIdentifier,
    setUrl,
    setDoi,
    setIsbn,
    resetInputs,
  };
}
