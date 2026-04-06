# Wikimedia Outreachy Wishlist #3: Duplicate Reference Prototype

This repository is a standalone interaction prototype for **Wikimedia Outreachy Wishlist #3**.  
It demonstrates how an editor-facing workflow could detect duplicate references while a user is adding a new citation.

## Problem Summary

When editors add references, the same source can appear multiple times in slightly different forms (different URL formatting, DOI prefixes, ISBN formatting, etc.).  
This creates cluttered reference sections and makes article maintenance harder.

This prototype focuses on the interaction flow for:
- entering reference identifiers
- normalizing user input
- detecting likely duplicates against existing references
- choosing what to do when a duplicate is found

## Supported Identifiers

The prototype currently checks duplicates using:
- `URL`
- `DOI`
- `ISBN`

Matching priority is:
1. DOI
2. ISBN
3. URL

## Normalization (Brief)

Before matching, identifiers are normalized to reduce formatting noise:
- URL: host lowercasing, trailing slash cleanup, known tracking query param cleanup
- DOI: strips `doi:` and `doi.org` prefixes, lowercases result
- ISBN: removes spaces/hyphens/prefix formatting and validates ISBN-10/ISBN-13 checksum

Normalization helps catch semantically identical references that are entered in different formats.

## Duplicate Detection Flow

1. Existing article references are shown from seed data.
2. User types URL, DOI, and/or ISBN in the new reference form.
3. Input is normalized reactively as the user types.
4. Prototype checks for duplicates against existing references.
5. UI shows current state:
   - duplicate found (with matched reference details), or
   - no duplicate found
6. If duplicate is found, user can choose:
   - **Reuse Existing**
   - **Create New Anyway** (warning-confirmed demo state)

This is frontend-only behavior for demonstration and discussion.

## Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Limitations

- Uses static seed reference data (no backend/API)
- No persistence of user actions
- Matching is identifier-based only (no fuzzy title/author matching)
- No production editor integration yet

## Future Improvements

- Integrate with real reference/citation storage
- Add richer duplicate scoring and explainability
- Add fuzzy matching for titles/authors/publication metadata
- Track user decisions (reuse vs create new) for UX validation
- Add end-to-end tests for editor-like workflows

As part of exploring the broader scope of the project, I also reviewed Wishlist #8 (Wikidata scoring support) to better understand how contribution tracking systems might be designed. I documented a short technical note outlining key challenges such as identifying relevant edits, defining scoring rules, and ensuring transparency in scoring. This helped me think more holistically about contributor workflows across the Wikimedia ecosystem.

See: `notes/wishlist8-thinking.md`
