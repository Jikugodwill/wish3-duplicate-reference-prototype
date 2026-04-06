Wishlist #8 Wikidata Scoring Tool (Exploration)

## 1. Problem Understanding

Wikidata edit contests are increasingly popular in the Wikimedia ecosystem, although there is no standardized tool to automatically evaluate contributions.

As a result:
- Gifts are usually recorded by hand or using ad-hoc scripts.
- This is time consuming and prone to errors.
- It restricts the flexibility and size of edit contests.

The aim of Wishlist #8 is to allow automated, transparent and scalable scoring of Wikidata edits, analogous to Wikiscore, which scores Wikipedia-based contests.

---

## 2. Key Challenges

### 2.1 Identifying Relevant Edits
Not every edit is to be counted equally. The system needs to:
- identify which edits belong to a particular contest.
- rule-based filtering (e.g., by property, item or topic)

### 2.2 Defining Scoring Rules
Various kinds of contributions can be of different value:
- designing a new product.
- deleting an existing item.
- inclusion of references or statements.

It is not easy to design fair and flexible scoring rules.

This section focuses on data volume and performance.
Wikidata is massive and constantly updated. The system must:
- manage big volumes of edits.
- do not have sluggish or blocking queries.
- real-time updates preferably.

### 2.4 Transparency and Trust
The respondents must be capable of:
- know how their score was calculated.
- verify their contributions
- believe the system is equal and impartial.

---

## 3. Possible Approach (High-Level)

An example of an architecture of this feature may be:

### Step 1 — Fetch Contributions
- Access user edits using Wikidata APIs.
- Select by time and contest range.

The second step is a Normalization and Filtering step.
- Sift through edits that are relevant according to contest rules.
- Standardize edit data to a standard form.

### Step 3 — Score Computation
- Add scoring rules on every edit.
- Combined scores on an individual basis.

In step 4, the aggregation and ranking of all the measures is performed.
- Compute total scores
- Rank participants
- Track measures (e.g., number of edits, types of edits)

### Step 5 — Presentation Layer
- Presentation of results is in a transparent interface (resembling Wikiscore)
- permit the organizers to verify and check results.

---

## 4. Open Questions

The questions that would require clarification are some of the following:

- What constitutes a valid Wikidata contribution to scoring?
- What should be the weight of various kinds of edits?
- What can be done to detect or filter abuse or poor-quality edits?
- Is real-time scoring or batch scoring required?
- What is the scope of contests (items, properties, topics)?

---

## 5. Relation to Wishlist #3

As much as Wishlist #3 and #8 are different in their areas of concern, they are similar in their aim:

- improving contributor experience
- lowering the resistance in workflows.
- simplifying interactions and making them more predictable.

Wishlist #3 enhances the editing experience itself, whereas Wishlist #8 enhances the process of contributions tracking and recognition.

---

## 6. Notes

The part is an exploratory note that aims to learn the system boundaries and challenges of Wishlist #8. Complete execution would mean closer interrelation with Wikidata APIs and existing Wikimedia tooling.