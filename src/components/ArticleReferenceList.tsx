import type { Reference } from '../domain/types';

interface ArticleReferenceListProps {
  references: Reference[];
}

function formatAuthors(authors?: string[]): string {
  if (!authors || authors.length === 0) return 'Unknown author';
  return authors.join(', ');
}

export function ArticleReferenceList({ references }: ArticleReferenceListProps) {
  return (
    <ul className="reference-list">
      {references.map((reference) => (
        <li className="reference-item" key={reference.id}>
          <h3>{reference.title}</h3>
          <p className="reference-meta">
            <strong>Authors:</strong> {formatAuthors(reference.authors)}
          </p>
          <p className="reference-meta">
            <strong>Source:</strong> {reference.source ?? 'Unknown source'}
            {reference.year ? ` (${reference.year})` : ''}
          </p>

          <div className="reference-identifiers">
            {reference.doi ? (
              <p>
                <strong>DOI:</strong> {reference.doi}
              </p>
            ) : null}
            {reference.isbn ? (
              <p>
                <strong>ISBN:</strong> {reference.isbn}
              </p>
            ) : null}
            {reference.url ? (
              <p>
                <strong>URL:</strong>{' '}
                <a href={reference.url} target="_blank" rel="noreferrer">
                  {reference.url}
                </a>
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
