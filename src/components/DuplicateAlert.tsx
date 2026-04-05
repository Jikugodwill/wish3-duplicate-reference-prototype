import type { MatchType } from '../domain/types';

interface DuplicateAlertProps {
  matchType: MatchType;
}

const MATCH_LABEL: Record<MatchType, string> = {
  doi: 'DOI',
  isbn: 'ISBN',
  url: 'URL',
};

export function DuplicateAlert({ matchType }: DuplicateAlertProps) {
  return (
    <div className="match-state match-state-duplicate" role="status" aria-live="polite">
      Potential duplicate detected via <strong>{MATCH_LABEL[matchType]}</strong>. Review the
      match details before deciding.
    </div>
  );
}
