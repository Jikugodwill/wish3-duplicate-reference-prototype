import { useEffect, useState } from 'react';

import { DuplicateAlert } from './DuplicateAlert';
import { MatchDetailsCard } from './MatchDetailsCard';
import { useDuplicateCheck } from '../hooks/useDuplicateCheck';
import type { Reference } from '../domain/types';

interface NewReferenceFormProps {
  references: Reference[];
}

type SubmissionMode = 'idle' | 'reuse-existing' | 'create-new-anyway';

export function NewReferenceForm({ references }: NewReferenceFormProps) {
  const [submissionMode, setSubmissionMode] = useState<SubmissionMode>('idle');

  const {
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
  } = useDuplicateCheck(references);

  useEffect(() => {
    setSubmissionMode('idle');
  }, [url, doi, isbn]);

  return (
    <div>
      <form className="new-reference-form" onSubmit={(event) => event.preventDefault()}>
        <p className="form-lead">
          Paste one or more identifiers. Matching runs as you type and keeps the entry local to
          this demo.
        </p>

        <label htmlFor="new-reference-url">URL</label>
        <input
          id="new-reference-url"
          name="url"
          type="url"
          placeholder="https://example.org/article"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          aria-invalid={Boolean(url.trim() && !normalizedUrl)}
        />

        <label htmlFor="new-reference-doi">DOI</label>
        <input
          id="new-reference-doi"
          name="doi"
          type="text"
          placeholder="10.xxxx/xxxxx"
          value={doi}
          onChange={(event) => setDoi(event.target.value)}
          aria-invalid={Boolean(doi.trim() && !normalizedDoi)}
        />

        <label htmlFor="new-reference-isbn">ISBN</label>
        <input
          id="new-reference-isbn"
          name="isbn"
          type="text"
          placeholder="978-0-00-000000-0"
          value={isbn}
          onChange={(event) => setIsbn(event.target.value)}
          aria-invalid={Boolean(isbn.trim() && !normalizedIsbn)}
        />

        {hasAnyInput ? (
          <div className="form-actions">
            <button
              type="button"
              className="action-button action-button-ghost"
              onClick={resetInputs}
            >
              Clear all fields
            </button>
          </div>
        ) : null}
      </form>

      {hasAnyInput ? (
        <section className="match-section" aria-live="polite">
          <h3>Current match state</h3>

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

          <div className="identifier-results">
            {(
              [
                ['url', 'URL'],
                ['doi', 'DOI'],
                ['isbn', 'ISBN'],
              ] as const
            ).map(([key, label]) => {
              const fieldValue = valuesByIdentifier[key];
              const normalizedValue = normalizedByIdentifier[key];
              const match = matchesByIdentifier[key];

              if (!fieldValue.trim()) {
                return (
                  <article className="identifier-result" key={key}>
                    <h4>{label} result</h4>
                    <div className="match-state">Not provided.</div>
                  </article>
                );
              }

              if (!normalizedValue) {
                return (
                  <article className="identifier-result" key={key}>
                    <h4>{label} result</h4>
                    <div className="match-state match-state-warning">
                      Invalid {label} format. Update this field to run duplicate checks.
                    </div>
                  </article>
                );
              }

              return (
                <article className="identifier-result" key={key}>
                  <h4>{label} result</h4>
                  {match?.found ? (
                    <>
                      <DuplicateAlert matchType={match.matchType} />
                      <MatchDetailsCard match={match} />
                    </>
                  ) : (
                    <div className="match-state match-state-clear">No duplicate found.</div>
                  )}
                </article>
              );
            })}
          </div>

          {hasAnyDuplicate ? (
          <>
            <div className="action-row">
              <button
                type="button"
                className="action-button action-button-primary"
                onClick={() => setSubmissionMode('reuse-existing')}
              >
                Reuse existing reference
              </button>
              <button
                type="button"
                className="action-button action-button-warning"
                onClick={() => setSubmissionMode('create-new-anyway')}
              >
                Create new anyway
              </button>
            </div>

            {submissionMode === 'reuse-existing' ? (
              <div className="match-state match-state-success">
                Existing reference would be reused in this citation flow.
              </div>
            ) : null}

            {submissionMode === 'create-new-anyway' ? (
              <div className="match-state match-state-warning-confirmed">
                Warning acknowledged. A new reference would still be created for this entry.
              </div>
            ) : null}
          </>
          ) : null}

          {!hasAnyDuplicate ? (
            <div className="match-state match-state-muted">
              No duplicates detected across the valid identifiers entered.
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
