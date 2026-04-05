import { normalizeDoi, normalizeIsbn, normalizeUrl } from './normalize';
import type {
  CandidateReferenceInput,
  DuplicateMatch,
  NormalizedReference,
  Reference,
} from './types';

export function toNormalizedReference(reference: Reference): NormalizedReference {
  return {
    raw: {
      id: reference.id,
      title: reference.title,
    },
    normalizedDoi: normalizeDoi(reference.doi),
    normalizedIsbn: normalizeIsbn(reference.isbn),
    normalizedUrl: normalizeUrl(reference.url),
  };
}

export function findDuplicateMatch(
  candidate: CandidateReferenceInput,
  references: Reference[],
): DuplicateMatch {
  const candidateDoi = normalizeDoi(candidate.doi);
  const candidateIsbn = normalizeIsbn(candidate.isbn);
  const candidateUrl = normalizeUrl(candidate.url);

  const normalizedReferences = references.map((reference) => ({
    reference,
    normalized: toNormalizedReference(reference),
  }));

  // Priority is strict: DOI > ISBN > URL.
  if (candidateDoi) {
    const byDoi = normalizedReferences.find(
      ({ normalized }) => normalized.normalizedDoi === candidateDoi,
    );
    if (byDoi) {
      return {
        found: true,
        matchType: 'doi',
        matchedReference: byDoi.reference,
        reason: `DOI match: ${candidateDoi}`,
      };
    }
  }

  if (candidateIsbn) {
    const byIsbn = normalizedReferences.find(
      ({ normalized }) => normalized.normalizedIsbn === candidateIsbn,
    );
    if (byIsbn) {
      return {
        found: true,
        matchType: 'isbn',
        matchedReference: byIsbn.reference,
        reason: `ISBN match: ${candidateIsbn}`,
      };
    }
  }

  if (candidateUrl) {
    const byUrl = normalizedReferences.find(
      ({ normalized }) => normalized.normalizedUrl === candidateUrl,
    );
    if (byUrl) {
      return {
        found: true,
        matchType: 'url',
        matchedReference: byUrl.reference,
        reason: `URL match after normalization: ${candidateUrl}`,
      };
    }
  }

  return {
    found: false,
    matchType: null,
    matchedReference: null,
    reason: 'No DOI, ISBN, or URL duplicate found.',
  };
}
