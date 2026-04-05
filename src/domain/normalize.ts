const TRACKING_QUERY_PREFIXES = ['utm_'];
const TRACKING_QUERY_KEYS = new Set(['gclid', 'fbclid', 'mc_cid', 'mc_eid', 'ref']);

const ISBN_10_MULTIPLIERS = [10, 9, 8, 7, 6, 5, 4, 3, 2];

export function normalizeUrl(value?: string | null): string | null {
  if (!value) return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    const protocol = url.protocol.toLowerCase();

    if (protocol !== 'http:' && protocol !== 'https:') return null;

    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    const pathname = url.pathname.replace(/\/+$/, '') || '/';
    const query = new URLSearchParams(url.search);

    // Drop known tracking params for stable duplicate checks.
    for (const key of [...query.keys()]) {
      const lowerKey = key.toLowerCase();
      const hasTrackingPrefix = TRACKING_QUERY_PREFIXES.some((prefix) =>
        lowerKey.startsWith(prefix),
      );
      if (hasTrackingPrefix || TRACKING_QUERY_KEYS.has(lowerKey)) {
        query.delete(key);
      }
    }

    // Sort params so ordering differences don't block a match.
    const sortedEntries = [...query.entries()].sort(([a], [b]) => a.localeCompare(b));
    const normalizedQuery = new URLSearchParams(sortedEntries);
    const queryString = normalizedQuery.toString();

    return `${protocol}//${host}${pathname}${queryString ? `?${queryString}` : ''}`;
  } catch {
    return null;
  }
}

export function normalizeDoi(value?: string | null): string | null {
  if (!value) return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  const withoutPrefix = trimmed
    .replace(/^doi:\s*/i, '')
    .replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '')
    .trim()
    .toLowerCase();

  const collapsed = withoutPrefix.replace(/\s+/g, '');

  if (!collapsed.startsWith('10.') || !collapsed.includes('/')) return null;

  return collapsed;
}

function isValidIsbn10(isbn10: string): boolean {
  const firstNine = isbn10.slice(0, 9);
  if (!/^\d{9}$/.test(firstNine)) return false;

  const checksumChar = isbn10[9];
  if (!/^(\d|X)$/.test(checksumChar)) return false;

  const sum = firstNine
    .split('')
    .reduce((acc, digit, index) => acc + Number(digit) * ISBN_10_MULTIPLIERS[index], 0);
  const checksumValue = checksumChar === 'X' ? 10 : Number(checksumChar);

  return (sum + checksumValue) % 11 === 0;
}

function isValidIsbn13(isbn13: string): boolean {
  if (!/^\d{13}$/.test(isbn13)) return false;

  const digits = isbn13.split('').map(Number);
  const sum = digits
    .slice(0, 12)
    .reduce((acc, digit, index) => acc + digit * (index % 2 === 0 ? 1 : 3), 0);
  const expectedChecksum = (10 - (sum % 10)) % 10;

  return digits[12] === expectedChecksum;
}

export function normalizeIsbn(value?: string | null): string | null {
  if (!value) return null;

  const cleaned = value
    .toUpperCase()
    .replace(/^ISBN(?:-1[03])?:?\s*/i, '')
    .replace(/[-\s]/g, '')
    .trim();

  if (cleaned.length === 10) {
    return isValidIsbn10(cleaned) ? cleaned : null;
  }

  if (cleaned.length === 13) {
    return isValidIsbn13(cleaned) ? cleaned : null;
  }

  return null;
}
