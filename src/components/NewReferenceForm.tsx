import { DuplicateAlert } from './DuplicateAlert';
import { MatchDetailsCard } from './MatchDetailsCard';
import { useDuplicateCheck } from '../hooks/useDuplicateCheck';
import type { Reference } from '../domain/types';

interface NewReferenceFormProps {
  references: Reference[];
}

export function NewReferenceForm({ references }: NewReferenceFormProps) {
  const {
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
  } = useDuplicateCheck(references);

  return (
    <div>
      <form className="new-reference-form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="new-reference-url">URL</label>
        <input
          id="new-reference-url"
          name="url"
          type="url"
          placeholder="https://example.org/article"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />

        <label htmlFor="new-reference-doi">DOI</label>
        <input
          id="new-reference-doi"
          name="doi"
          type="text"
          placeholder="10.xxxx/xxxxx"
          value={doi}
          onChange={(event) => setDoi(event.target.value)}
        />

        <label htmlFor="new-reference-isbn">ISBN</label>
        <input
          id="new-reference-isbn"
          name="isbn"
          type="text"
          placeholder="978-0-00-000000-0"
          value={isbn}
          onChange={(event) => setIsbn(event.target.value)}
        />
      </form>

      <section className="match-section" aria-live="polite">
        <h3>Current match state</h3>

        {hasAnyInput ? (
          <div className="normalized-preview">
            <p>
              <strong>Normalized URL:</strong> {normalizedUrl ?? 'Invalid or empty'}
            </p>
            <p>
              <strong>Normalized DOI:</strong> {normalizedDoi ?? 'Invalid or empty'}
            </p>
            <p>
              <strong>Normalized ISBN:</strong> {normalizedIsbn ?? 'Invalid or empty'}
            </p>
          </div>
        ) : null}

        {!hasAnyInput ? (
          <div className="match-state">Enter a URL, DOI, or ISBN to check duplicates.</div>
        ) : null}

        {hasAnyInput && match?.found ? (
          <>
            <DuplicateAlert matchType={match.matchType} />
            <MatchDetailsCard match={match} />
          </>
        ) : null}

        {hasAnyInput && match && !match.found ? (
          <div className="match-state match-state-clear">No duplicate found.</div>
        ) : null}
      </section>
    </div>
  );
}
