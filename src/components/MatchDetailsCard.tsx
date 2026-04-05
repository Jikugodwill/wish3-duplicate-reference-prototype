import type { DuplicateFoundMatch } from '../domain/types';

interface MatchDetailsCardProps {
  match: DuplicateFoundMatch;
}

export function MatchDetailsCard({ match }: MatchDetailsCardProps) {
  const { matchedReference } = match;

  return (
    <article className="match-details" aria-label="Matched reference details">
      <h3>Matched existing reference</h3>
      <p className="match-details-title">{matchedReference.title}</p>
      <p>
        <strong>Reason:</strong> {match.reason}
      </p>
      {matchedReference.source ? (
        <p>
          <strong>Source:</strong> {matchedReference.source}
          {matchedReference.year ? ` (${matchedReference.year})` : ''}
        </p>
      ) : null}
      {matchedReference.doi ? (
        <p>
          <strong>DOI:</strong> {matchedReference.doi}
        </p>
      ) : null}
      {matchedReference.isbn ? (
        <p>
          <strong>ISBN:</strong> {matchedReference.isbn}
        </p>
      ) : null}
      {matchedReference.url ? (
        <p>
          <strong>URL:</strong> {matchedReference.url}
        </p>
      ) : null}
    </article>
  );
}
