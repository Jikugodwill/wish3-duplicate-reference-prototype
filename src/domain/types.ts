export type MatchType = 'doi' | 'isbn' | 'url';

export interface Reference {
  id: string;
  title: string;
  authors?: string[];
  source?: string;
  year?: number;
  url?: string;
  doi?: string;
  isbn?: string;
}

export interface CandidateReferenceInput {
  title?: string;
  url?: string;
  doi?: string;
  isbn?: string;
}

export interface NormalizedReference {
  raw: Pick<Reference, 'id' | 'title'>;
  normalizedUrl: string | null;
  normalizedDoi: string | null;
  normalizedIsbn: string | null;
}

export interface DuplicateFoundMatch {
  found: true;
  matchType: MatchType;
  matchedReference: Reference;
  reason: string;
}

export interface DuplicateNotFoundMatch {
  found: false;
  matchType: null;
  matchedReference: null;
  reason: string;
}

export type DuplicateMatch = DuplicateFoundMatch | DuplicateNotFoundMatch;
